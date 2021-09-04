<script lang="ts" context="module">
  import SEO from "svelte-seo";

  import type { Load } from '@sveltejs/kit';
  import type { QueryResult } from './[slug].json';
  // import { getReadingTime } from '$lib/utils/getReadingTime';
  // import { blocksToText } from '$lib/utils/blocksToText';

  export const load: Load = async ({ page, fetch }) => {
    const { slug } = page.params;
    const res = await fetch(`/posts/${slug}.json`);

		if (res.ok) {
      const { title, body, description, publishedAt } = await res.json() as QueryResult;

			return {
				props: {
          title,
          description,
          publishedAt,
          blocks: body,
          // readingTime: getReadingTime(blocksToText(body))
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load '/posts.json'`)
		};
  }
</script>

<script lang="ts">
  import { PortableText } from 'svelte-pote';
  import type { CustomBlockComponents, CustomSpanComponents } from 'svelte-pote';

  import FigureBlock from '$lib/components/FigureBlock.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import HighlightMark from '$lib/components/HighlightMark.svelte';

  const customBlockComponents: CustomBlockComponents = {
    figure: FigureBlock,
    code: CodeBlock,
  };
  const customSpanComponents: CustomSpanComponents = {
    highlight: HighlightMark,
  };

  export let title: string;
  export let description: string;
  export let publishedAt: string;
  // export let readingTime: string;
  export let blocks: Sanity.Schema.BlockContent;
</script>

<SEO {title} {description}></SEO>

<div class="mt-6 md:mt-0">
  <div class="relative flex flex-col space-y-6 md:space-y-0 md:flex-row md:items-center">
    <div class="z-10 ">
      <span class="block text-xs font-bold tracking-widest text-gray-700 text-opacity-50 uppercase dark:text-green-200 dark:text-opacity-70 md:text-sm">
        {publishedAt}
      </span>
      <span class="block font-serif text-5xl font-semibold tracking-tight text-gray-800 title md:text-6xl lg:text-7xl dark:text-gray-200">
        {title}
      </span>
    </div>
  </div>

  <div class="relative block mt-4 text-xl leading-normal text-gray-900 sm:mt-10 md:text-2xl font-extralight dark:text-gray-200">
    {description}
  </div>

</div>

<article class="mt-12 prose sm:prose-lg sm:mt-24 dark:prose-dark prose-green">
  <PortableText {blocks} {customBlockComponents} {customSpanComponents} />
</article>
