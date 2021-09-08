<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import type { QueryResult } from './[slug].json';

  export const load: Load = async ({ page, fetch }) => {
    const { slug } = page.params;
    const res = await fetch(`/projects/${slug}.json`);

		if (res.ok) {
      const project = await res.json() as QueryResult;

			return {
				props: {
          ...project,
          blocks: project.body,
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load '/projects/${slug}.json'`)
		};
  }
</script>

<script lang="ts">
  import SEO from "svelte-seo";
  import { PortableText } from 'svelte-pote';
  import type { CustomBlockComponents, CustomSpanComponents } from 'svelte-pote';

  import FigureBlock from '$lib/components/content/FigureBlock.svelte';
  import CodeBlock from '$lib/components/content/CodeBlock.svelte';
  import HighlightMark from '$lib/components/content/HighlightMark.svelte';
  import Figure from '$lib/components/Figure.svelte';
  import PersonCard from '$lib/components/Person.svelte';

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
  export let coverImage: ImageProps | null;
  export let blocks: Sanity.Schema.BlockContent;
  export let members: Person[] = null;
  export let categories: string[] = null;
</script>

<SEO title="{title} | Paul Lavender-Jones" {description}></SEO>

{#if coverImage}
  <Figure image={coverImage} featured={true}/>
{/if}

<div class="grid sm:grid-cols-[5fr,2fr] mt-2 lg:mt-6 sm:space-x-4 mb-8 sm:mb-16 lg:mb-24">
  <div>
    <div>
      <p class="text-xs font-bold tracking-widest text-gray-700 text-opacity-50 uppercase dark:text-green-200 dark:text-opacity-70 md:text-sm">
        {publishedAt}
      </p>
      <h1 class="font-serif text-3xl font-semibold tracking-tight text-gray-800 title lg:text-5xl dark:text-gray-200">
        {title}
      </h1>
    </div>
    <article class="mt-4 prose sm:mt-8 dark:prose-dark prose-green">
      <PortableText {blocks} {customBlockComponents} {customSpanComponents} />
    </article>
  </div>
  <div class="space-y-2 divide-y-2 divide-gray-300 dark:divide-gray-600">
    <div class="mt-5 lg:mt-8">
      <p class="hidden text-sm leading-normal text-gray-900 sm:block font-extralight dark:text-gray-200">
        {description}
      </p>
    </div>
    {#if members && members.length}
      <div>
        <h3 class="my-2 text-xs font-bold tracking-widest text-gray-700 text-opacity-50 uppercase dark:text-gray-200 dark:text-opacity-70 md:text-sm">
          Members
        </h3>
        <div class="space-y-2">
          {#each members as { name, avatar }}
            <PersonCard {name} {avatar}></PersonCard>
          {/each}
        </div>
      </div>
    {/if}
    {#if categories && categories.length}
      <div>
        <h3 class="my-2 text-xs font-bold tracking-widest text-gray-700 text-opacity-50 uppercase dark:text-gray-200 dark:text-opacity-70 md:text-sm">
          Categories
        </h3>
        <div>
          {#each categories as name}
            <span class="inline-block mr-1 py-0.5 px-1 text-xs font-semibold text-gray-100 bg-gray-500 rounded">{name}</span>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
