import groq from 'groq';
import { sanity } from '$lib/sanity';

import { parseISO } from 'date-fns';

const name = "Paul Lavender-Jones";
const website = "https://paullj.me";

const query = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path('drafts.**')) && publishedAt < now()]| order(publishedAt desc) {
    title,
    "slug": slug.current,
    publishedAt,
  }
`;

type QueryResult = Array<Pick<Sanity.Schema.Post, "title" | "publishedAt" | "description"> & { slug: string }>

export async function get() {
  const results = await sanity.fetch<QueryResult>(query);
  const body = xml(results)

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  }
  return {
    headers,
    body,
  }
}

const xml =
  (posts: QueryResult) => `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>${name}</title>
    <link>${website}</link>
    <description>A blog built with SvelteKit about tech and stuff!</description>
    ${posts
      .map(
        ({ title, description, publishedAt, slug }) =>
          `
        <item>
          <title>${title}</title>
          <description>A blog built with SvelteKit about tech and stuff!</description>
          <link>${website}/posts/${slug}/</link>
          <pubDate>${parseISO(publishedAt)}</pubDate>
          <content:encoded>${description}
            <div style="margin-top: 50px; font-style: italic;">
              <strong>
                <a href="${website}/posts/${slug}">
                  Keep reading
                </a>
              </strong>
            </div>
          </content:encoded>
        </item>
      `
      )
      .join('')}
  </channel>
</rss>`
