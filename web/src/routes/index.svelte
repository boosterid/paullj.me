<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/index.json');

		if (res.ok) {
      const data = await res.json();

			return {
				props: {
          ...data,
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load '/index.json'`)
		};
  }
</script>

<script lang="ts">
  import SEO from "svelte-seo";

  import At from '@svicons/remix-line/at.svelte';
  import GitHub from '@svicons/remix-fill/github.svelte';
  import LinkedIn from '@svicons/remix-fill/linkedin-box.svelte';
  import RSS from '@svicons/remix-fill/rss.svelte';

  import List from '$lib/components/List.svelte';
  import PostListItem from '$lib/components/PostListItem.svelte';
  import ProjectListItem from '$lib/components/ProjectListItem.svelte';

  export let title: string;
  export let description: string;
  export let email: string;
  export let githubUrl: string;
  export let linkedInUrl: string;
  export let cvFileUrl: string;

  export let posts: Post[];
  export let projects: Project[];

  $: emailHref = encodeURI(`mailto:${email}?subject=Hi!`);
</script>

<SEO {title} {description}></SEO>

<div class="mb-12 sm:mt-18 sm:mb-24">
	<h1 class="font-serif text-4xl font-semibold leading-none sm:text-5xl">
		Paul
		<br/>
		Lavender-Jones
	</h1>

  <div class="flex items-center mt-4 space-x-4">
    <a href={emailHref} class="transition hover:text-green-600">
      <At height="2.5rem"/>
    </a>
    <a href={linkedInUrl} class="transition hover:text-green-600">
      <LinkedIn height="2.5rem"/>
    </a>
    <a href={githubUrl} class="transition hover:text-green-600">
      <GitHub height="2.5rem"/>
    </a>
    <a href="{cvFileUrl}?dl={title.replace(' ', '_')}_CV_2021" class="font-semibold text-center transition hover:text-green-600">
      Curriculum Vitae
    </a>
  </div>
</div>

<div class="mb-12 sm:mb-24">
  <List items={projects} let:item>
    <h2 slot="title" id="projects" class="font-serif text-xl">
      <a href="/projects" sveltekit:prefetch class="hover:underline">
        Projects
      </a>
    </h2>
    <ProjectListItem slot="item" title={item.title} description={item.description} categories={item.categories} slug={item.slug}></ProjectListItem>
  </List>
</div>

<div class="mb-12 sm:mb-24">
  <List items={posts} let:item>
    <h2 slot="title" id="posts" class="font-serif text-xl flex items-center space-x-2">
      <a href="/posts" sveltekit:prefetch class="hover:underline">
        Blog
      </a>
      <a href="/rss.xml" class="hover:text-orange-500">
        <RSS height="1rem"></RSS>
      </a>
    </h2>
    <PostListItem slot="item" title={item.title} slug={item.slug} date={item.publishedAt}></PostListItem>
  </List>
</div>
