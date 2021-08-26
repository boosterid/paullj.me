import type { Block } from "./blocks";

export interface Post {
  title: string;
  slug: string;
  publishedAt: string;
  blocks?: Block[]
}
