import groq from 'groq';
import { sanity } from '$lib/sanity';
import { generateImage } from '$lib/utils/generateImage';

const query = groq`
  *[_type == "project" && defined(slug.current) && !(_id in path('drafts.**'))]| order(publishedAt desc) [$start..$end] {
    title,
    "slug": slug.current,
    description,
    coverImage {
      ...,
      asset ->
    }
  }
`;

type QueryResult = Array<Pick<Sanity.Schema.Project, "title" | "description" | "coverImage"> & { slug: string }>

export const get = async () => {
  const results = await sanity.fetch<QueryResult>(query, {
    start: 0, end: 3
  });

  if (results) {
    const projects = results.map(project => ({
      ...project,
      coverImage: generateImage(project.coverImage, 500, 300)
    }));

    return {
      body: projects,
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find projects from Sanity.io`)
  };
}
