<script lang="ts">
  import Image from "./Image.svelte";

  export let title: string;
  export let description: string;
  export let slug : string;
  export let coverImage: ImageProps;

</script>

<div class="w-full">
  <a href="/projects/{slug}" sveltekit:prefetch class="grayscale-[25%] hover:grayscale-0 transition-all">
    <div class="w-full h-32 overflow-hidden rounded-sm">
      {#if coverImage}
        <Image {...coverImage} lazyLoad={false}></Image>
      {:else}
        <div class="w-full h-full bg-gradient-to-br from-green-600 to-green-900"></div>
      {/if}
    </div>
  </a>
  <div class="flex flex-row items-center pt-1 space-x-2 text-base sm:text-lg">
    <a href="/projects/{slug}" sveltekit:prefetch class="hover:underline">
      {title}
    </a>
  </div>
  <div>
    <p class="text-sm font-light text-gray-600 dark:text-gray-400">{description}</p>
  </div>
</div>
