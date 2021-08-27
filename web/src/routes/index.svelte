<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/posts.json');

		if (res.ok) {
			return {
				props: {
					posts: await res.json()
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
  import Bio from '$lib/components/Banner.svelte';
  import Posts from '$lib/components/Posts.svelte';

  export let posts: Post[];
</script>

<div class="mb-12 sm:mb-24">
	<h1 class="mb-12 font-serif text-4xl font-semibold leading-none sm:text-5xl">
		Paul
		<br/>
		Lavender-Jones
	</h1>

  <Bio description="This website is a place for me to show off some things I have been working on. I am currently a student at the University of Bath studying for a master's degree in Mechanical Engineering."></Bio>
</div>

<div>
  <Posts {posts}></Posts>
  <!-- <div class="flex items-center justify-center w-full pt-4">
    <a href="/posts/1" sveltekit:prefetch class="text-sm font-extrabold tracking-widest text-gray-600 uppercase hover:underline dark:text-gray-400 ">
      More Posts
    </a>
  </div> -->
</div>
