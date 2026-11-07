"""Glass 3D sector icons for the IQ site (round 37: sleek).

Style: slim, layered glass after Apple's Liquid Glass icons. Each icon is 2-4 thin flat-fronted plates with fully
rounded edges; depth comes from a slight separation between layers and crisp edge highlights (a clear coat), not
from bulk. The body is clear lilac-white glass, the accents deep brand plum. Upright and front-facing, turned
slightly about the vertical axis only, so the thickness reads without tilting. One studio scene renders all six.

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
def glass(name, light, deep, transmission, roughness):
    """Polished glass whose colour runs from `light` (top-left of each part) to `deep` (bottom-right), under a clear
    coat that draws the crisp edge highlight, with a faint grain."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    N, L = nt.nodes, nt.links
    b = N["Principled BSDF"]
    set_input(b, ["Transmission Weight", "Transmission"], transmission)
    set_input(b, "Roughness", roughness)
    set_input(b, "IOR", 1.45)
    set_input(b, ["Coat Weight", "Clearcoat"], 0.35)              # light coat: frosted body, crisp edge line
    set_input(b, ["Coat Roughness", "Clearcoat Roughness"], 0.08)
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
    """Fillet every corner of a closed 2D polygon with radius r. Nearly straight points (dense arcs) are kept as they
    are, and each fillet stays within half of both adjacent edges, so the outline never folds back on itself."""
    out = []
    k = len(points)
    for i in range(k):
        p0, p1, p2 = Vector(points[i - 1]), Vector(points[i]), Vector(points[(i + 1) % k])
        d1, d2 = (p0 - p1), (p2 - p1)
        half = min(d1.length, d2.length) / 2
        d1.normalize(); d2.normalize()
        ang = math.acos(max(-1, min(1, d1.dot(d2))))
        if ang > math.radians(170):                 # already smooth: a fillet would only add near-duplicate points
            out.append(p1)
            continue
        t = min(r / math.tan(ang / 2), half) if ang > 1e-3 else 0
        a, c = p1 + d1 * t, p1 + d2 * t
        for j in range(n + 1):                      # quadratic bezier through the corner approximates the arc
            u = j / n
            out.append((1 - u) ** 2 * a + 2 * (1 - u) * u * p1 + u ** 2 * c)
    return [(p.x, p.y) for p in out]


def rrect(x0, y0, x1, y1, r):
    return rounded([(x0, y0), (x1, y0), (x1, y1), (x0, y1)], r)


def slab(points, depth, mat, z=0.0, bevel=0.1, inset=True):
    """Extrusion of a 2D outline (x right, y up) with rounded edges, standing upright facing -y, centred at y = -z.
    inset: the silhouette is exactly the drawn outline (bevel offset inwards), so parts meet where they are drawn;
    convex fillets must then be at least `bevel`. Thin parts (scales) use inset=False: the bevel grows outwards."""
    cu = bpy.data.curves.new("slab", "CURVE")
    cu.dimensions = "2D"
    cu.fill_mode = "BOTH"
    cu.extrude = max(depth / 2 - bevel, 0.001)
    cu.bevel_depth = bevel
    cu.offset = -bevel if inset else 0.0                          # default grows the shape outward by the bevel
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


def heart_points(s=1.0, notch=0.24, n=28):
    """Drawn like a designer would: two circular lobes, a concave fillet of radius `notch` where they meet, straight
    sides tangent to the lobes down to a rounded tip. The notch fillet is larger than any edge radius used on it, so
    the rounded extrusion cannot spike there."""
    c, cy, r, tip = 0.5 * s, 0.3 * s, 0.56 * s, Vector((0, -1.12 * s))
    rf = notch * s
    yf = cy + math.sqrt((r + rf) ** 2 - c ** 2)                   # fillet circle tangent to both lobes
    F = Vector((0, yf))

    def tangent(C, side):                                         # outer tangent point from the tip to lobe C
        d = C - tip
        a = math.acos(r / d.length)
        phi = math.atan2(-d.y, -d.x)
        return phi + side * a

    Cl, Cr = Vector((-c, cy)), Vector((c, cy))
    pts = []
    left_n = math.atan2(F.y - cy, F.x + c)                        # where the left lobe meets the fillet
    right_n = math.atan2(F.y - cy, F.x - c)
    tl = tangent(Cl, -1) % (2 * math.pi)
    if tl < left_n:
        tl += 2 * math.pi
    for i in range(n + 1):                                        # left lobe: tip side up over the top to the notch
        a = tl + (left_n - tl) * i / n
        pts.append(Cl + Vector((math.cos(a), math.sin(a))) * r)
    fa0 = math.atan2(cy - yf, -c)
    fa1 = math.atan2(cy - yf, c)
    if fa1 < fa0:
        fa1 += 2 * math.pi
    for i in range(1, n // 2):                                    # concave notch fillet
        a = fa0 + (fa1 - fa0) * i / (n // 2)
        pts.append(F + Vector((math.cos(a), math.sin(a))) * rf)
    tr = tangent(Cr, 1)
    while tr > right_n:
        tr -= 2 * math.pi
    for i in range(n + 1):                                        # right lobe: notch over the top down to the tip side
        a = right_n + (tr - right_n) * i / n
        pts.append(Cr + Vector((math.cos(a), math.sin(a))) * r)
    k = len(pts)
    out = [(p.x, p.y) for p in pts]
    tip_round = rounded([out[k - 1], (tip.x, tip.y), out[0]], 0.14 * s, 8)[9:18]   # fillet the tip only
    return out + tip_round


def arc(cx, cy, r, a0, a1, n=24):
    return [(cx + r * math.cos(a0 + (a1 - a0) * i / n), cy + r * math.sin(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]


# ---------- icons: slim layered plates; G = clear lilac glass, A = deep plum glass ----------
T, E = 0.2, 0.085              # plate thickness and edge radius: edges are nearly fully round


def icon_bank(G, A):
    slab(rounded([(-1.15, 0.4), (1.15, 0.4), (0, 1.1)], 0.1), T, G, 0.0, E)              # roof
    for x in (-0.66, -0.22, 0.22, 0.66):                                                  # columns: a layer behind,
        slab(rrect(x - 0.13, -0.52, x + 0.13, 0.5, 0.11), 0.14, A, -(T / 2 + 0.08), 0.06)  # ends tucked under roof and base
    slab(rrect(-1.15, -0.78, 1.15, -0.42, 0.12), T, G, 0.0, E)                            # base


def icon_chart(G, A):
    slab(rrect(-1.05, -1.05, 1.05, 1.05, 0.32), T, G, 0.0, E)                             # tile
    for x, h in ((-0.52, 0.62), (0.0, 0.98), (0.52, 1.36)):
        slab(rrect(x - 0.17, -0.6, x + 0.17, -0.6 + h, 0.15), 0.12, A, T / 2 + 0.07, 0.05)  # bars, laid on the tile


def icon_factory(G, A):
    """Manufacturing, the common ground of FMCG, healthcare and industrials: sawtooth roof, chimney, lit windows."""
    def roofline(x):                                                                       # first sawtooth slope
        return -0.04 + (x + 1.1) * 0.45
    slab(rounded([(-1.0, roofline(-1.0) - 0.03), (-0.66, roofline(-0.66) - 0.03), (-0.66, 1.1), (-1.0, 1.1)], 0.12),
         0.16, G, -0.02, 0.07)                                                             # chimney: ends on the roofline
    body = [(-1.1, -0.9), (1.1, -0.9), (1.1, 0.32), (0.4, -0.04), (0.4, 0.32), (-0.3, -0.04), (-0.3, 0.32), (-1.1, -0.04)]
    slab(rounded(body, 0.1), T, G, 0.0, E)                                                # sawtooth hall
    for x in (-0.6, 0.05, 0.7):
        slab(rrect(x - 0.14, -0.6, x + 0.14, -0.34, 0.06), 0.08, A, T / 2 + 0.05, 0.035)  # windows, laid on the hall


def icon_scales(G, A):
    # thin parts: outward bevel (inset=False); an inward offset on a 0.14-tall beam leaves nothing and spikes
    slab(rounded([(-0.55, -1.15), (0.55, -1.15), (0.2, -0.85), (-0.2, -0.85)], 0.1), 0.24, G, 0, 0.08, False)  # foot
    slab(rrect(-0.05, -0.95, 0.05, 0.95, 0.05), 0.1, G, 0.0, 0.04, False)                # post
    slab(rrect(-1.15, 0.68, 1.15, 0.78, 0.05), 0.1, G, 0.0, 0.04, False)                 # beam
    slab(arc(0, 0.95, 0.1, 0, 2 * math.pi, 32)[:-1], 0.14, A, 0.02, 0.04, False)         # pivot cap
    for sx in (-1, 1):
        x = sx * 0.85
        for dx in (-0.4, 0.4):                                                            # two fine strings per pan
            slab([(x + dx - 0.01, 0.0), (x + dx + 0.01, 0.0), (x + 0.01, 0.72), (x - 0.01, 0.72)], 0.02, G, 0.0, 0.012, False)
        bowl = [(x - 0.5, 0.0)] + [(x + 0.5 * math.cos(math.pi + a * math.pi / 16), -0.03 + 0.3 * math.sin(math.pi + a * math.pi / 16))
                                   for a in range(1, 16)] + [(x + 0.5, 0.0)]
        slab(rounded(bowl, 0.04), 0.16, A, 0.0, 0.06, False)                             # pan


def icon_megaphone(G, A):
    bpy.ops.mesh.primitive_cone_add(radius1=0.26, radius2=0.7, depth=1.4, vertices=64, location=(0.15, 0, 0.1),
                                    rotation=(0, math.pi / 2, 0))
    soften(bpy.context.object, 0.04, 2).data.materials.append(G)                         # horn
    bpy.ops.mesh.primitive_torus_add(major_radius=0.7, minor_radius=0.06, location=(0.85, 0, 0.1),
                                     rotation=(0, math.pi / 2, 0), major_segments=96, minor_segments=24)
    rim = bpy.context.object
    for p in rim.data.polygons:
        p.use_smooth = True
    rim.data.materials.append(A)                                                          # rim
    bpy.ops.mesh.primitive_cylinder_add(radius=0.27, depth=0.3, vertices=64, location=(-0.7, 0, 0.1),
                                        rotation=(0, math.pi / 2, 0))
    soften(bpy.context.object, 0.04, 2).data.materials.append(A)                         # mouthpiece
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(-0.3, 0, -0.55))
    h = bpy.context.object
    h.scale = (0.2, 0.22, 0.62)
    h.rotation_euler = (0, 0.2, 0)
    bpy.ops.object.transform_apply(scale=True)
    soften(h, 0.05, 2).data.materials.append(A)                                           # handle


def icon_heart(G, A):
    slab(heart_points(1.15), 0.36, G, 0.0, 0.15)                                         # pillow: edge radius ~ half the depth
    slab(heart_points(0.5), 0.1, A, 0.22, 0.045)                                         # small heart, laid on the front


def capsule(x0, y0, x1, y1, r, n=12):
    """Closed outline of a rounded bar from (x0, y0) to (x1, y1) with end radius r (fingers, thumbs)."""
    a = math.atan2(y1 - y0, x1 - x0)
    return (arc(x1, y1, r, a - math.pi / 2, a + math.pi / 2, n)
            + arc(x0, y0, r, a + math.pi / 2, a + 3 * math.pi / 2, n))


def hand_points(side):
    """One cupped hand (side = 1 right, -1 left), drawn like the flat reference: the two palms together form a round
    bowl (outer edges on one circle, meeting at the bottom centre) that runs on up into the little finger. The palm's
    inner edge is the thumb, sweeping from the wrist up and outwards to a rounded tip; three upright fingers stand on
    it, stepping down towards the centre. Parts are separate pieces with small gaps, so the glass never shows
    overlapping volumes."""
    R = 1.1
    outer = arc(0, 0, R, math.radians(-85), math.radians(12), 30)       # bottom centre up the outside of the bowl
    ox, oy = outer[-1]
    pinky_in = 0.89
    c, pr = ((ox + pinky_in) / 2, oy), (ox - pinky_in) / 2
    tip = arc(c[0], c[1], pr, 0, math.pi, 12)[1:]                          # round little-finger tip
    wrist, ctrl, thumb = Vector((0.11, -0.97)), Vector((0.3, -0.42)), Vector((0.76, -0.13))
    inner = [tuple((1 - u) ** 2 * thumb + 2 * (1 - u) * u * ctrl + u ** 2 * wrist)
             for u in (i / 16 for i in range(17))]                         # thumb tip curving down to the wrist
    palm = rounded(outer + tip + [(pinky_in, -0.04)] + inner, 0.11, 8)
    rim = sorted(inner)                                                    # thumb edge, left to right

    def edge(x):                                                           # height of the thumb edge at x
        for (x0, y0), (x1, y1) in zip(rim, rim[1:]):
            if x0 <= x <= x1:
                return y0 + (y1 - y0) * (x - x0) / (x1 - x0)
        return rim[-1][1]
    r, gap = 0.078, 0.03
    # (base x, length, outward lean): upright, fanning out a touch with the bowl; innermost shortest
    fingers = [capsule(x, edge(x) + r + gap, x + lean, edge(x) + r + gap + length, r) for x, length, lean in
               ((0.43, 0.2, 0.0), (0.6, 0.3, 0.02), (0.77, 0.32, 0.04))]
    return [palm, *fingers] if side == 1 else [[(-x, y) for x, y in part[::-1]] for part in [palm, *fingers]]


def icon_hands(G, A):
    """IQ Social alternative: the same heart, smaller, held above two cupped hands."""
    for side in (1, -1):
        palm, *fingers = hand_points(side)
        slab(palm, 0.18, G, 0.0, 0.085)                                    # bevel ≈ half the depth: no seam
        for f in fingers:
            slab(f, 0.15, G, 0.0, 0.07)
    s, lift = 0.55, 0.3                                                   # nestled between the fingers, as in the reference
    slab([(x, y + lift) for x, y in heart_points(s)], 0.24, G, 0.24, 0.1)                 # heart pillow, in front
    slab([(x, y + lift) for x, y in heart_points(s * 0.45)], 0.07, A, 0.24 + 0.15, 0.03)  # small plum heart on it


# Dove: drawn as a flat 24px master (dove.svg, per the icon-designer workflow), each path extruded into a layer.
# id prefix -> (material, depth, z of the layer's centre, edge radius); thin parts keep an outward bevel (no spikes).
DOVE_LAYERS = {
    "wing-far": ("G", 0.12, -0.2, 0.05),       # far wing peeks out behind the body
    "body": ("G", 0.3, 0.0, 0.12),             # plump pillow, like the heart
    "beak": ("A", 0.08, 0.15, 0.03),          # laid on the face, reaching past it like the eye's layer
    "wing-near": ("G", 0.14, 0.23, 0.06),      # near wing laid on the body's front
    "eye": ("A", 0.06, 0.16, 0.025),
    "sprig-stem": ("A", 0.05, 0.13, 0.02),     # olive sprig in front of the chest
    "sprig-leaf": ("A", 0.07, 0.13, 0.03),
}


def icon_dove(G, A, width=2.4):
    """IQ Social alternative: a dove carrying an olive sprig, extruded from tools/icons3d/dove.svg."""
    bpy.ops.import_curve.svg(filepath=os.path.join(os.path.dirname(os.path.abspath(__file__)), "dove.svg"))
    objs = [o for o in bpy.context.scene.objects if o.type == "CURVE"]
    pts = [p.co for o in objs for s in o.data.splines for p in s.bezier_points]
    lo = Vector((min(p.x for p in pts), min(p.y for p in pts)))
    hi = Vector((max(p.x for p in pts), max(p.y for p in pts)))
    mid, k = (lo + hi) / 2, width / (hi.x - lo.x)
    mats = {"G": G, "A": A}
    for o in objs:
        mat, depth, z, bevel = next(v for key, v in DOVE_LAYERS.items() if o.name.startswith(key))
        for s in o.data.splines:
            for p in s.bezier_points:
                for attr in ("co", "handle_left", "handle_right"):
                    v = getattr(p, attr)
                    setattr(p, attr, ((v.x - mid.x) * k, (v.y - mid.y) * k, 0))
        cu = o.data
        cu.dimensions = "2D"
        cu.fill_mode = "BOTH"
        cu.extrude = max(depth / 2 - bevel, 0.001)
        cu.bevel_depth = bevel
        cu.bevel_resolution = 8
        cu.materials.clear()
        cu.materials.append(mats[mat])
        o.rotation_euler = (math.pi / 2, 0, 0)
        o.location = (0, -z, 0)


BUILDERS = {"bank": icon_bank, "chart": icon_chart, "factory": icon_factory,
            "scales": icon_scales, "megaphone": icon_megaphone, "heart": icon_heart, "hands": icon_hands,
            "dove": icon_dove}


# ---------- studio ----------
def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def upright_pose(turn=-16):
    """Turned slightly about the vertical axis only, so the thickness shows; no tilt or roll."""
    bpy.context.view_layer.update()                               # matrix_world is stale until updated
    m = Matrix.Rotation(math.radians(turn), 4, "Z")
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

    # bright, even studio: soft lilac-white all round, so the glass glows rather than mirrors a room
    world = bpy.data.worlds.new("world")
    sc.world = world
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Color"].default_value = lin("#F6EEF4")
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.6

    mn, mx = bounds()
    centre = (mn + mx) / 2
    radius = (mx - mn).length / 2

    for loc, energy, size in (((-3.5, -3.0, 4.0), 900, 3.0),      # soft key, top-left (the site's --glass-angle); smaller = crisper edge highlight
                              ((-0.5, 3.0, 3.5), 700, 2.5),      # top-back rim: the bright line along the upper edges
                              ((3.5, 2.5, 1.5), 450, 4.0),       # back-right fill lights the glass from behind
                              ((0.0, -4.0, -2.0), 100, 4.0)):    # low front bounce keeps the undersides clear
        bpy.ops.object.light_add(type="AREA", location=loc)
        l = bpy.context.object
        l.data.energy = energy
        l.data.size = size
        aim(l, centre)

    cam_data = bpy.data.cameras.new("cam")
    cam_data.lens = 85                                            # long lens: little perspective, verticals stay upright
    cam = bpy.data.objects.new("cam", cam_data)
    sc.collection.objects.link(cam)
    sc.camera = cam
    fov = 2 * math.atan(cam_data.sensor_width / (2 * cam_data.lens))
    dist = radius / math.sin(fov / 2) * 0.84
    el = math.radians(2)                                          # eye level
    cam.location = centre + Vector((0, -math.cos(el), math.sin(el))) * dist
    aim(cam, centre)


def render(name, out_dir, samples):
    reset()
    G = glass("glass", "#F8F0F6", "#C48DB8", 0.92, 0.4)          # frosted lilac-white
    A = glass("accent", "#9E3A8C", "#4A0E42", 0.4, 0.32)         # deep brand plum, satin
    BUILDERS[name](G, A)
    upright_pose()
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
