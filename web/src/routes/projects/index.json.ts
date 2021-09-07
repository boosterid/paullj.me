import groq from 'groq';
import { sanity } from '$lib/sanity';
import { generateImage } from '$lib/utils/generateImage';

const query = groq`
  *[_type == "project" && defined(slug.current) && !(_id in path('drafts.**'))]| order(publishedAt desc) {
    title,
    "slug": slug.current,
    description,
    "categories": categories[]->title
  }
`;

type QueryResult = Array<Project>

export const get = async () => {
  const results = await sanity.fetch<QueryResult>(query);

  if (results) {

    return {
      body: results,
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find projects from Sanity.io`)
  };
}
