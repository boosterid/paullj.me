<script lang="ts">
  import Image from "./Image.svelte";
  import type { ImageData } from "$lib/models/image";

  export let image: ImageData;
  export let caption: string = null;
  export let featured: boolean = false;
</script>

<figure class:featured={featured} class:not-featured={!featured} class="w-full mx-auto">
  <Image {...image}></Image>
  {#if caption}
    <figcaption class="text-center">{caption}</figcaption>
  {/if}
</figure>

<style lang="postcss">
  .featured {
    @apply lg:w-[115%] lg:ml-[-7.5%];
  }
  .not-featured {
    @apply max-w-screen-sm;
  }
</style>
