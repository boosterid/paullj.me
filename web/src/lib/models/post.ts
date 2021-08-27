export type Post = Pick<Sanity.Schema.Post, "title" | "publishedAt" | "body" | "description"> & { slug: string };
