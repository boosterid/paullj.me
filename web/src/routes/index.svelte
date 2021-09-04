<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    // FIXME: Make one groq query that fetches all of this information
    const res = await fetch('/index.json');
    const postRes = await fetch('/posts.json');
    const projectRes = await fetch('/projects.json');

		if (res.ok && postRes.ok && projectRes) {
      const settings = await res.json();

			return {
				props: {
          ...settings,
					posts: await postRes.json(),
					projects: await projectRes.json()
				}
			};
		}

		return {
			status: postRes.status,
			error: new Error(`Could not load '/posts.json'`)
		};
  }
</script>

<script lang="ts">
  import SEO from "svelte-seo";
  import Bio from '$lib/components/Banner.svelte';
  import List from '$lib/components/List.svelte';
  import Grid from '$lib/components/Grid.svelte';
  import PostListItem from '$lib/components/PostListItem.svelte';
  import ProjectGridItem from '$lib/components/Project.svelte';

  export let title: string;
  export let description: string;
  export let avatar: ImageProps;

  export let posts: Post[];
  export let projects: Project[];
</script>

<SEO {title} {description}></SEO>

<div class="mb-12 sm:mb-24">
	<h1 class="mb-12 font-serif text-4xl font-semibold leading-none sm:text-5xl">
		Paul
		<br/>
		Lavender-Jones
	</h1>

  <Bio {description} {avatar}/>
</div>

<div class="mb-12 sm:mb-24">
  <List id="posts" title="Recent Posts" items={posts} let:item>
    <PostListItem title={item.title} slug={item.slug} date={item.publishedAt}></PostListItem>
  </List>
  <div class="w-full pt-4 text-center">
    <a href="/posts" sveltekit:prefetch class="text-sm font-extrabold tracking-widest text-gray-600 uppercase hover:underline dark:text-gray-400 ">
      More Posts
    </a>
  </div>
</div>

<div>
  <Grid title="Recent Projects" items={projects} let:item>
    <ProjectGridItem title={item.title} description={item.description} slug={item.slug} coverImage={item.coverImage}></ProjectGridItem>
  </Grid>
  <div class="w-full pt-4 text-center">
    <a href="/projects" sveltekit:prefetch class="text-sm font-extrabold tracking-widest text-gray-600 uppercase hover:underline dark:text-gray-400 ">
      More Projects
    </a>
  </div>
</div>
