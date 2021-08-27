<script lang="ts">
	export let posts: Post[];
</script>

<h2 id="posts" class="font-serif text-xl">
  Recent Posts
</h2>
<ul class="">
  {#each posts as {title, slug, publishedAt}}
    <li class="flex items-center space-x-4">
      <div>
          <span class="text-xs font-extrabold tracking-widest text-gray-600 uppercase sm:text-sm dark:text-gray-400">
            {publishedAt}
          </span>
          <a href="/posts/{slug}" sveltekit:prefetch class="ml-2 text-base transition-shadow sm:text-lg shadow-thin hover:shadow-thick ring-green-500 ring-opacity-30 dark:ring-opacity-70">
            {title}
          </a>
      </div>
    </li>
  {:else}
    <li>
      No posts yet!
    </li>
  {/each}
</ul>
