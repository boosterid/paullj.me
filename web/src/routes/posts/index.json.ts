import type { Post } from '$lib/models/post';
import { parseISO, format } from 'date-fns';
import sanity from '$lib/utils/useSanity';

export const get = async () => {
  const query = `
    *[_type == "post" && defined(slug.current) && publishedAt < now()]| order(publishedAt desc) [$start..$end] {
      title,
      "slug": slug.current,
      publishedAt,
    }`;

  const results: Post[] = await sanity.fetch(query, {
    start: 0, end: 5
  });
  if (results) {
    const posts = results.map(({ title, slug, publishedAt }) => ({
      title,
      slug,
      publishedAt: format(parseISO(publishedAt), "EEE do MMMM ''yy")
    }));

    return {
      body: posts,
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find posts from Sanity.io`)
  };
}
