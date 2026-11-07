// Content schemas. Every file in src/content/ is validated here at build time: a missing field, a misspelt field
// name, a typo in an id, or a reference to a sector/person that does not exist fails `npm run build` instead of
// breaking the live site.
import { defineCollection, reference } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

// Each file is a YAML list; the list order is the display order. Astro does not keep file order, so the parser
// records each entry's position as `order` (read it through getOrdered() in src/lib/content.ts).
function list<S extends z.ZodRawShape>(name: string, shape: S) {
  return defineCollection({
    loader: file(`src/content/${name}.yaml`, {
      parser: (text) => (parse(text) as Record<string, unknown>[]).map((entry, order) => ({ ...entry, order })),
    }),
    schema: z.strictObject({ ...shape, id: z.string().regex(/^[a-z0-9-]+$/, 'ids are lowercase-with-dashes'), order: z.number().int() }),
  });
}

const titled = { title: z.string(), text: z.string() };

export const collections = {
  sectors: list('sectors', {
    title: z.string(),
    icon: z.enum(['bank', 'chart', 'factory', 'scales', 'megaphone', 'heart', 'hands']),
    lead: reference('people'),
    tags: z.array(z.string()).min(1).max(5),
    intro: z.array(z.string()).min(1),
    areas: z.array(z.string()).min(1),
    clients: z.array(z.string()).optional(),
  }),
  hires: list('hires', {
    role: z.string(),
    org: z.string(),
    sector: reference('sectors'),
    label: z.string(),
  }),
  people: list('people', {
    name: z.string(),
    title: z.string(),
    group: z.enum(['partner', 'associate', 'advisor']),
    focus: z.string(),
    face: z.string(),
    founder: z.boolean().default(false),
    bio: z.string().optional(),
  }),
  quotes: list('quotes', { text: z.string(), name: z.string(), role: z.string() }),
  clients: list('clients', {
    name: z.string(),
    file: z.string().regex(/\.(svg|webp|png)$/),
    height: z.number().int().min(10).max(48),
    showName: z.boolean().default(false),
  }),
  method: list('method', titled),
  services: list('services', titled),
  pillars: list('pillars', titled),
  site: list('site', {
    name: z.string(),
    url: z.url(),
    tagline: z.string(),
    email: z.email(),
    enquiryEmail: z.email(),
    phones: z.array(z.strictObject({ label: z.string(), tel: z.string().regex(/^\+\d+$/) })).min(1),
    address: z.strictObject({
      street: z.string(),
      city: z.string(),
      postcode: z.string(),
      postcodeDisplay: z.string(),
      country: z.string(),
      countryCode: z.string().length(2),
    }),
    era: z.string(),
    lastReviewed: z.string(),
    areaServed: z.array(z.string()),
  }),
};
