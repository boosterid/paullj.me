import type { Post } from '$lib/models/post';
import sanity from '$lib/utils/useSanity';
import { parseISO, format } from 'date-fns';

export const get = async ({ params }) => {
  const { slug } = params;
  const query = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    description,
    body[] {
      ...,
			_type == 'figure' => {
        ...,
        image { asset-> }
      }
    }
  }`;

  const result: Post = await sanity.fetch(query, { slug });
  if (result) {
    return {
      body: {
        ...result,
        publishedAt: format(parseISO(result.publishedAt), 'EEEEE do MMM y')
      },
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find post /${slug} from Sanity.io`)
  };
};
