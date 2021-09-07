<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/projects.json');

		if (res) {
			return {
				props: {
					projects: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load '/projects.json'`)
		};
  }
</script>

<script lang="ts">
  import List from '$lib/components/Grid.svelte';
  import ProjectListItem from '$lib/components/ProjectListItem.svelte';

  export let projects: Project[];
</script>

<div>
  <List items={projects} let:item>
    <h2 slot="title" class="font-serif text-xl">
      <a href="/projects" sveltekit:prefetch class="hover:underline">
        Projects
      </a>
    </h2>
    <ProjectListItem slot="item" title={item.title} description={item.description} categories={item.categories} slug={item.slug}></ProjectListItem>
  </List>
</div>
