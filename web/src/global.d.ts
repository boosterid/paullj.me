/// <reference types="@sveltejs/kit" />

declare module '*.svg?src' {
  const content: string
  export default content
}

declare module '*.svg?component' {
  const content: string
  export default content
}

declare module '*.svg?url' {
  const content: string
  export default content
}

// FIXME: Workaround till this is sorted out https://github.com/ricokahler/sanity-codegen/issues/6
declare namespace Sanity {
  namespace Schema {
    type Code = {
      _type: 'code';
      language?: string;
      filename?: string;
      highlightedLines?: number[];
      code: string;
    }
  }
}

type Post = Pick<Sanity.Schema.Post, "title" | "publishedAt" | "body" | "description"> & { slug: string };
type Project = Pick<Sanity.Schema.Project, "title" | "publishedAt" | "body" | "description" | "coverImage"> & { slug: string, categories: Array<string>};
type Person = Pick<Sanity.Schema.Person, "name"> & { avatar: ImageProps };

interface ImageProps {
  aspectRatio?: number,
  placeholder?: string,
  src: string,
  srcset?: string,
  alt: string,
}
