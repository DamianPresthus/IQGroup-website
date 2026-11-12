// Content and asset lookups shared by components.
import { getCollection, getEntry, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { ImageMetadata } from 'astro';

type Glob = Record<string, ImageMetadata>;
const byName = (glob: Glob) =>
  Object.fromEntries(Object.entries(glob).map(([path, img]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), img]));
const byFile = (glob: Glob) => Object.fromEntries(Object.entries(glob).map(([path, img]) => [path.split('/').pop()!, img]));

const icons = Object.fromEntries(
  Object.entries(import.meta.glob<string>('../assets/icons/*-duotone.svg', { eager: true, query: '?url', import: 'default' })).map(([path, url]) => [path.split('/').pop()!.replace('-duotone.svg', ''), url]),
);
const faces = byName(import.meta.glob<ImageMetadata>('../assets/team-face/*.jpg', { eager: true, import: 'default' }));
const logos = byFile(import.meta.glob<ImageMetadata>('../assets/clients/*.{svg,webp,png}', { eager: true, import: 'default' }));

function pick(map: Record<string, ImageMetadata>, key: string, kind: string): ImageMetadata {
  const img = map[key];
  if (!img) throw new Error(`Missing ${kind} image "${key}". Available: ${Object.keys(map).join(', ')}`);
  return img;
}
export const iconUrl = (name: string): string => {
  const url = icons[name];
  if (!url) throw new Error(`Missing sector icon "${name}". Available: ${Object.keys(icons).join(', ')}`);
  return url;
};
export const faceImage = (name: string) => pick(faces, name, 'face');
export const logoImage = (file: string) => pick(logos, file, 'client logo');

export async function getSite() {
  const site = await getEntry('site', 'iq');
  if (!site) throw new Error('src/content/site.yaml must contain one entry with id: iq');
  return site.data;
}

/** A collection in the order of its YAML file (Astro's own getCollection order is not guaranteed). */
export async function getOrdered<C extends CollectionKey>(name: C): Promise<CollectionEntry<C>[]> {
  const position = ({ data }: CollectionEntry<C>) => ('order' in data && typeof data.order === 'number' ? data.order : 0);
  return (await getCollection(name)).sort((a, b) => position(a) - position(b));
}

export async function getPerson(ref: CollectionEntry<'sectors'>['data']['lead']) {
  const person = await getEntry(ref);
  if (!person) throw new Error(`Unknown person "${ref.id}"`);
  return person.data;
}
