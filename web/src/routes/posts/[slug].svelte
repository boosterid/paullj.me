<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ page, fetch }) => {
    const { slug } = page.params;
    const res = await fetch(`/posts/${slug}.json`);

		if (res.ok) {
      const post = await res.json();

			return {
				props: {
					blocks: post.body
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
  import HighlightMark from '$lib/components/HighlightMark.svelte';

  const customBlockComponents: CustomBlockComponents = {
    figure: FigureBlock,
  };
  const customSpanComponents: CustomSpanComponents = {
    highlight: HighlightMark,
  };

  export let blocks;
</script>

<article class="mt-12 prose sm:prose-lg sm:mt-24 dark:prose-dark prose-green">
  <PortableText {blocks} {customBlockComponents} {customSpanComponents} />
</article>
