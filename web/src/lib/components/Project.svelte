<script lang="ts">
  import Arrow from '@svicons/remix-line/arrow-right-s.svelte';

  export let title: string;
  export let description: string;
  export let slug : string;
  export let categories : string[];
</script>


<li class="inline-grid items-center grid-flow-col w-full grid-cols-[min-content,min-content,max-content] grid-rows-2 gap-x-2">
  <Arrow height="1rem"></Arrow>
  <div />
  <div>
    <a href="/projects/{slug}" sveltekit:prefetch class="text-base transition-shadow sm:text-lg shadow-thin hover:shadow-thick ring-green-500 ring-opacity-30 dark:ring-opacity-70">
      {title}
    </a>
  </div>
  <div class="space-x-2 break-words">
    {#each categories as name}
      <span class="py-0.5 px-1 text-xs font-semibold text-gray-100 bg-gray-500 rounded">{name}</span>
    {/each}
  </div>
  <div class="row-span-2 self-start mt-0.5">
    <p class="font-light">{description}</p>
  </div>
</li>
