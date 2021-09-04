import groq from 'groq';
import { sanity } from '$lib/sanity';
import { generateImage } from '$lib/utils/generateImage';

const query = groq`
  *[_type == "siteSettings" && !(_id in path('drafts.**'))][0] {
		...,
    author -> {
      ...,
      avatar {
        ...,
        asset ->
      }
    }
  }
`;

type QueryResult = Pick<Sanity.Schema.SiteSettings, "title" | "description"> & { author: Sanity.Schema.Person }

export const get = async () => {
  const results = await sanity.fetch<QueryResult>(query);

  if (results) {
    return {
      body: {
        title: results.title,
        description: results.description,
        avatar: results.author ? generateImage(results.author.avatar, 250, 250) : null
      },
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find!`)
  };
}
