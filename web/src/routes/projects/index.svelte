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
  import Grid from '$lib/components/Grid.svelte';
  import ProjectGridItem from '$lib/components/Project.svelte';

  export let projects: Project[];
</script>

<div>
  <Grid title="Recent Projects" items={projects} let:item>
    <ProjectGridItem title={item.title} description={item.description} slug={item.slug} coverImage={item.coverImage}></ProjectGridItem>
  </Grid>
</div>
