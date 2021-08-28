import groq from 'groq';
import { sanity } from '$lib/sanity';

const query = groq`
  *[_type == "project" && defined(slug.current) && !(_id in path('drafts.**'))]| order(publishedAt desc) [$start..$end] {
    title,
    "slug": slug.current,
    description,
  }
`;

type QueryResult = Array<Pick<Sanity.Schema.Project, "title" | "description"> & { slug: string }>

export const get = async () => {
  const results = await sanity.fetch<QueryResult>(query, {
    start: 0, end: 3
  });

  if (results) {
    const posts = results.map(({ title, slug, description }) => ({
      title,
      slug,
      description
    }));

    return {
      body: posts,
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find projects from Sanity.io`)
  };
}
