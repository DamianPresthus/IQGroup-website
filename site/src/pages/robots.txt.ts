// robots.txt. Crawling is always allowed: whether a page may appear in search results is decided by the
// <meta name="robots"> tag in Base.astro (noindex until PUBLIC_INDEXABLE=true), and crawlers must be able to read it.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
