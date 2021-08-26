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
  import type { CustomBlockComponents } from 'svelte-pote';
  import FigureBlock from '$lib/components/FigureBlock.svelte';

  const customBlockComponents: CustomBlockComponents = {
    figure: FigureBlock,
  };

  export let blocks;
</script>

<div>
  
</div>

<article class="mt-12 prose sm:mt-24 dark:prose-dark prose-green">
  <PortableText {blocks} {customBlockComponents} />
</article>
