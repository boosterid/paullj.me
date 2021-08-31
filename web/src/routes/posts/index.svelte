<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/posts.json');

		if (res) {
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
  import PostListItem from '$lib/components/PostListItem.svelte';
  import List from '$lib/components/List.svelte';

  export let posts: Post[];
</script>

<List id="posts" title="Recent Posts" items={posts} let:item>
  <PostListItem title={item.title} slug={item.slug} date={item.publishedAt}></PostListItem>
</List>
