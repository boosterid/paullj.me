import groq from 'groq';
import { sanity } from '$lib/sanity';
import { parseISO, format } from 'date-fns';

const query = groq`
  *[_type == "siteSettings" && !(_id in path('drafts.**'))][0] {
    title,
    description,
    email,
    githubUrl,
    linkedInUrl,
    "cvFileUrl": cvFile.asset->url,
    "posts": *[_type == "post" && defined(slug.current) && !(_id in path('drafts.**')) && publishedAt < now()]| order(publishedAt desc) [$start..$end] {
      title,
      "slug": slug.current,
      publishedAt,
    },
    "projects": *[_type == "project" && defined(slug.current) && !(_id in path('drafts.**'))]| order(publishedAt desc) [$start..$end] {
      title,
      "slug": slug.current,
      description,
      "categories": categories[]->title
    }
  }
`;

type QueryResult = Pick<Sanity.Schema.SiteSettings, "title" | "description" | "email" | "githubUrl" | "linkedInUrl"> & {
    posts: Array<Post>,
    projects: Array<Project>
  };

export const get = async () => {
  const results = await sanity.fetch<QueryResult>(query, {
    start: 0, end: 5
  });

  if (results) {
    const posts = results.posts.map(post => ({
      ...post,
      publishedAt: format(parseISO(post.publishedAt), "EEE do MMMM ''yy")
    }))

    return {
      body: {
        ...results,
        posts
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
