"""Frosted-glass 3D sector icons for the IQ v4 site (round 34).

Style after the "Stylized 3D Icons - Frosted Glass" community set: chunky, puffy, simplified forms of two or three
parts; milky frosted glass with a fine grain; each part shades from near-white on the lit top-left to saturated
plum on the shaded side; accents are the same material in a deeper plum; no plinths; a "dynamic" three-quarter turn
and tilt seen from near eye level, filling the frame. One studio scene renders all six, so they match exactly.

Usage:
  blender -b -P tools/icons3d/render.py -- <icon|all> [out_dir] [samples]
  icons: bank, chart, factory, scales, megaphone, heart
"""
import math
import os
import sys

import bpy
from mathutils import Matrix, Vector

ICONS = ("bank", "chart", "factory", "scales", "megaphone", "heart")
SIZE = 384                     # largest use is 168px (sector strip) at 2x


# ---------- colour (sRGB hex -> linear RGBA) ----------
def lin(hex_):
    h = hex_.lstrip("#")
    out = []
    for i in (0, 2, 4):
        c = int(h[i:i + 2], 16) / 255
        out.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    return (*out, 1.0)


def set_input(node, names, value):
    for n in names if isinstance(names, (list, tuple)) else [names]:
        if n in node.inputs:
            node.inputs[n].default_value = value
            return


# ---------- materials ----------
def frosted(name, light, deep, transmission, roughness):
    """Milky frosted glass whose colour runs from `light` (top-left of each part) to `deep` (bottom-right), with a
    fine grain on the surface."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    N, L = nt.nodes, nt.links
    b = N["Principled BSDF"]
    set_input(b, ["Transmission Weight", "Transmission"], transmission)
    set_input(b, "Roughness", roughness)
    set_input(b, "IOR", 1.4)
    # gradient across each part: generated coords, fac = 0.55*(1 - z) + 0.45*x (light top-left -> deep bottom-right)
    tc = N.new("ShaderNodeTexCoord")
    sep = N.new("ShaderNodeSeparateXYZ")
    L.new(tc.outputs["Generated"], sep.inputs[0])
    inv = N.new("ShaderNodeMath"); inv.operation = "SUBTRACT"; inv.inputs[0].default_value = 1.0
    L.new(sep.outputs["Z"], inv.inputs[1])
    a = N.new("ShaderNodeMath"); a.operation = "MULTIPLY"; a.inputs[1].default_value = 0.55
    L.new(inv.outputs[0], a.inputs[0])
    bx = N.new("ShaderNodeMath"); bx.operation = "MULTIPLY"; bx.inputs[1].default_value = 0.45
    L.new(sep.outputs["X"], bx.inputs[0])
    fac = N.new("ShaderNodeMath"); fac.operation = "ADD"
    L.new(a.outputs[0], fac.inputs[0]); L.new(bx.outputs[0], fac.inputs[1])
    ramp = N.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position, ramp.color_ramp.elements[0].color = 0.05, lin(light)
    ramp.color_ramp.elements[1].position, ramp.color_ramp.elements[1].color = 0.72, lin(deep)
    L.new(fac.outputs[0], ramp.inputs["Fac"])
    L.new(ramp.outputs["Color"], b.inputs["Base Color"])
    # grain: fine noise on the normal
    noise = N.new("ShaderNodeTexNoise"); noise.inputs["Scale"].default_value = 900.0
    bump = N.new("ShaderNodeBump"); bump.inputs["Strength"].default_value = 0.06
    L.new(noise.outputs["Fac"], bump.inputs["Height"])
    L.new(bump.outputs["Normal"], b.inputs["Normal"])
    return m


# ---------- geometry ----------
def rounded(points, r, n=10):
    """Fillet every corner of a closed 2D polygon with radius r (clamped to half the shorter adjacent edge)."""
    out = []
    k = len(points)
    for i in range(k):
        p0, p1, p2 = Vector(points[i - 1]), Vector(points[i]), Vector(points[(i + 1) % k])
        d1, d2 = (p0 - p1), (p2 - p1)
        rr = min(r, d1.length / 2, d2.length / 2)
        d1.normalize(); d2.normalize()
        ang = math.acos(max(-1, min(1, d1.dot(d2))))
        t = rr / math.tan(ang / 2) if ang > 1e-3 else 0
        a, c = p1 + d1 * t, p1 + d2 * t
        for j in range(n + 1):                      # quadratic bezier through the corner approximates the arc
            u = j / n
            out.append((1 - u) ** 2 * a + 2 * (1 - u) * u * p1 + u ** 2 * c)
    return [(p.x, p.y) for p in out]


def rrect(x0, y0, x1, y1, r):
    return rounded([(x0, y0), (x1, y0), (x1, y1), (x0, y1)], r)


def slab(points, depth, mat, z=0.0, bevel=0.1):
    """Puffy extrusion of a 2D outline (x right, y up) standing upright, facing -y, front face at y = -z - depth."""
    cu = bpy.data.curves.new("slab", "CURVE")
    cu.dimensions = "2D"
    cu.fill_mode = "BOTH"
    cu.extrude = max(depth / 2 - bevel, 0.001)
    cu.bevel_depth = bevel
    cu.bevel_resolution = 8
    sp = cu.splines.new("POLY")
    sp.points.add(len(points) - 1)
    for p, (x, y) in zip(sp.points, points):
        p.co = (x, y, 0, 1)
    sp.use_cyclic_u = True
    o = bpy.data.objects.new("slab", cu)
    bpy.context.collection.objects.link(o)
    o.rotation_euler = (math.pi / 2, 0, 0)
    o.location = (0, -z, 0)
    o.data.materials.append(mat)
    return o


def soften(o, bevel=0.12, subd=2):
    m = o.modifiers.new("bevel", "BEVEL")
    m.width = bevel
    m.segments = 3
    m.limit_method = "ANGLE"
    s = o.modifiers.new("subd", "SUBSURF")
    s.levels = s.render_levels = subd
    for p in o.data.polygons:
        p.use_smooth = True
    return o


def mesh_slab(points, depth, mat, z=0.0, bevel=0.12):
    """Like slab() but as a solid mesh softened by bevel + subdivision: no self-intersection at cusps (heart)."""
    import bmesh
    me = bpy.data.meshes.new("mslab")
    bm = bmesh.new()
    verts = [bm.verts.new((x, -z - depth / 2, y)) for x, y in points]
    face = bm.faces.new(verts)
    bmesh.ops.recalc_face_normals(bm, faces=[face])
    ext = bmesh.ops.extrude_face_region(bm, geom=[face])
    moved = [e for e in ext["geom"] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=moved, vec=(0, depth, 0))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new("mslab", me)
    bpy.context.collection.objects.link(o)
    soften(o, bevel, 2).data.materials.append(mat)
    return o


def heart_points(scale=1.0):
    pts = []
    for i in range(48):                                       # then filleted: the tip and notch are cusps
        t = i / 48 * 2 * math.pi
        x = 16 * math.sin(t) ** 3
        y = 13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)
        pts.append((x / 17 * scale, y / 17 * scale))
    return rounded(pts, 0.12 * scale, 6)


# ---------- icons: 2D silhouettes, puffed; G = frosted light, A = deeper plum accent ----------
def icon_bank(G, A):
    slab(rounded([(-1.15, 0.5), (1.15, 0.5), (0, 1.2)], 0.14), 0.42, G, 0.0, 0.13)       # roof
    for x in (-0.62, 0.0, 0.62):
        slab(rrect(x - 0.15, -0.42, x + 0.15, 0.36, 0.13), 0.3, A, 0.06, 0.11)           # columns, set back
    slab(rrect(-1.15, -0.82, 1.15, -0.5, 0.15), 0.42, G, 0.0, 0.13)                       # base


def icon_chart(G, A):
    slab(rrect(-1.05, -1.0, 1.05, 1.05, 0.38), 0.4, G, 0.0, 0.16)                         # tile
    for x, h in ((-0.5, 0.75), (0.0, 1.15), (0.5, 1.55)):
        slab(rrect(x - 0.15, -0.62, x + 0.15, -0.62 + h, 0.14), 0.22, A, 0.3, 0.1)        # bars, proud of the tile




def icon_scales(G, A):
    slab(rounded([(-0.55, -1.15), (0.55, -1.15), (0.2, -0.85), (-0.2, -0.85)], 0.1), 0.42, G, 0, 0.12)  # foot
    slab(rrect(-0.11, -0.95, 0.11, 0.95, 0.1), 0.24, G, 0.0, 0.1)                         # post
    slab(rrect(-1.15, 0.62, 1.15, 0.84, 0.11), 0.26, G, 0.0, 0.1)                         # beam
    for sx in (-1, 1):
        x = sx * 0.85
        slab(rrect(x - 0.045, -0.05, x + 0.045, 0.7, 0.04), 0.09, G, 0.0, 0.04)            # hanger
        bowl = [(x - 0.5, 0.0)] + [(x + 0.5 * math.cos(math.pi + a * math.pi / 16), -0.05 + 0.32 * math.sin(math.pi + a * math.pi / 16))
                                   for a in range(1, 16)] + [(x + 0.5, 0.0)]
        slab(rounded(bowl, 0.05), 0.5, A, 0.0, 0.1)                                       # pan


def icon_megaphone(G, A):
    bpy.ops.mesh.primitive_cone_add(radius1=0.32, radius2=0.82, depth=1.5, vertices=64, location=(0.15, 0, 0.1),
                                    rotation=(0, math.pi / 2, 0))
    horn = bpy.context.object
    soften(horn, 0.08, 2).data.materials.append(G)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.82, minor_radius=0.11, location=(0.9, 0, 0.1),
                                     rotation=(0, math.pi / 2, 0), major_segments=96, minor_segments=24)
    rim = bpy.context.object
    for p in rim.data.polygons:
        p.use_smooth = True
    rim.data.materials.append(A)
    bpy.ops.mesh.primitive_cylinder_add(radius=0.34, depth=0.4, vertices=64, location=(-0.75, 0, 0.1),
                                        rotation=(0, math.pi / 2, 0))
    soften(bpy.context.object, 0.08, 2).data.materials.append(A)                          # mouthpiece
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(-0.3, 0, -0.6))
    h = bpy.context.object
    h.scale = (0.28, 0.3, 0.75)
    h.rotation_euler = (0, 0.2, 0)
    bpy.ops.object.transform_apply(scale=True)
    soften(h, 0.08, 2).data.materials.append(A)                                           # handle


def icon_heart(G, A):
    mesh_slab(heart_points(1.15), 0.55, G, 0.0, 0.16)
    mesh_slab(heart_points(0.55), 0.18, A, 0.42, 0.06)                                          # small inner heart, proud


def arc(cx, cy, r, a0, a1, n=24):
    return [(cx + r * math.cos(a0 + (a1 - a0) * i / n), cy + r * math.sin(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]


def icon_factory(G, A):
    """Manufacturing, the common ground of FMCG, healthcare and industrials: sawtooth roof, chimney, lit windows."""
    slab(rrect(-0.98, -0.1, -0.66, 1.15, 0.12), 0.3, G, -0.08, 0.1)                        # chimney, set back
    body = [(-1.1, -0.9), (1.1, -0.9), (1.1, 0.32), (0.4, -0.04), (0.4, 0.32), (-0.3, -0.04), (-0.3, 0.32), (-1.1, -0.04)]
    slab(rounded(body, 0.09), 0.46, G, 0.0, 0.13)                                         # sawtooth hall
    for x in (-0.6, 0.05, 0.7):
        slab(rrect(x - 0.17, -0.62, x + 0.17, -0.3, 0.08), 0.12, A, 0.27, 0.05)            # windows, proud








BUILDERS = {"bank": icon_bank, "chart": icon_chart, "factory": icon_factory,
            "scales": icon_scales, "megaphone": icon_megaphone, "heart": icon_heart}


# ---------- studio ----------
def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def dynamic_pose(turn=-28, tilt=10, roll=-6):
    """The reference set's "Dynamic" orientation: turned to show the side depth, tipped back slightly, rolled."""
    bpy.context.view_layer.update()                               # matrix_world is stale until updated
    m = (Matrix.Rotation(math.radians(turn), 4, "Z") @ Matrix.Rotation(math.radians(tilt), 4, "X")
         @ Matrix.Rotation(math.radians(roll), 4, "Y"))
    for o in bpy.context.scene.objects:
        o.matrix_world = m @ o.matrix_world


def aim(obj, target):
    obj.rotation_mode = "QUATERNION"
    obj.rotation_quaternion = (target - obj.location).to_track_quat("-Z", "Y")


def bounds():
    mn = Vector((1e9, 1e9, 1e9))
    mx = Vector((-1e9, -1e9, -1e9))
    dg = bpy.context.evaluated_depsgraph_get()
    for o in bpy.context.scene.objects:
        if o.type not in {"MESH", "CURVE"}:
            continue
        ev = o.evaluated_get(dg)
        for c in ev.bound_box:
            w = ev.matrix_world @ Vector(c)
            mn = Vector(map(min, mn, w))
            mx = Vector(map(max, mx, w))
    return mn, mx


def studio(samples):
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    try:
        prefs = bpy.context.preferences.addons["cycles"].preferences
        prefs.compute_device_type = "METAL"
        prefs.get_devices()
        for d in prefs.devices:
            d.use = d.type == "METAL"
        sc.cycles.device = "GPU"
    except Exception:
        sc.cycles.device = "CPU"
    sc.cycles.samples = samples
    sc.cycles.use_denoising = True
    sc.cycles.max_bounces = 12
    sc.cycles.transmission_bounces = 12
    sc.render.film_transparent = True
    sc.render.resolution_x = sc.render.resolution_y = SIZE
    sc.view_settings.view_transform = "Standard"                  # AgX greyed the plum; Standard keeps it saturated
    sc.render.image_settings.file_format = "WEBP"
    sc.render.image_settings.color_mode = "RGBA"
    sc.render.image_settings.quality = 92

    # bright, even studio: soft lilac-white all round, so the frost glows rather than reflects
    world = bpy.data.worlds.new("world")
    sc.world = world
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Color"].default_value = lin("#F6EEF4")
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.6

    mn, mx = bounds()
    centre = (mn + mx) / 2
    radius = (mx - mn).length / 2

    for loc, energy, size in (((-3.5, -3.0, 4.0), 1200, 5.0),     # big soft key, top-left (the site's --glass-angle)
                              ((3.5, 2.5, 1.5), 650, 4.0),       # back-right fill lights the frost from behind
                              ((0.0, -4.0, -2.0), 120, 4.0)):    # low front bounce keeps the undersides milky
        bpy.ops.object.light_add(type="AREA", location=loc)
        l = bpy.context.object
        l.data.energy = energy
        l.data.size = size
        aim(l, centre)

    cam_data = bpy.data.cameras.new("cam")
    cam_data.lens = 60
    cam = bpy.data.objects.new("cam", cam_data)
    sc.collection.objects.link(cam)
    sc.camera = cam
    fov = 2 * math.atan(cam_data.sensor_width / (2 * cam_data.lens))
    dist = radius / math.sin(fov / 2) * 0.84
    el = math.radians(6)                                          # near eye level
    cam.location = centre + Vector((0, -math.cos(el), math.sin(el))) * dist
    aim(cam, centre)


def render(name, out_dir, samples):
    reset()
    G = frosted("frost", "#F6E2F0", "#A3348E", 0.8, 0.32)
    A = frosted("accent", "#B45AA0", "#4E0F45", 0.5, 0.38)
    BUILDERS[name](G, A)
    dynamic_pose()
    studio(samples)
    path = os.path.join(out_dir, f"{name}.webp")
    bpy.context.scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    print("WROTE", path)


if __name__ == "__main__":
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    which = argv[0] if argv else "all"
    out_dir = os.path.abspath(argv[1] if len(argv) > 1 else "source/assets/icons-3d")
    samples = int(argv[2]) if len(argv) > 2 else 256
    os.makedirs(out_dir, exist_ok=True)
    for n in (ICONS if which == "all" else [which]):
        render(n, out_dir, samples)
