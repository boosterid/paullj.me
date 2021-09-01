<script lang="ts">
  import Image from "./Image.svelte";

  export let image: ImageProps;
  export let caption: string = null;
  export let featured: boolean = false;
</script>

<figure class:featured={featured} class:not-featured={!featured} class="w-full mx-auto">
  <Image {...image}></Image>
  {#if caption}
    <figcaption class="text-center">{caption}</figcaption>
  {/if}
</figure>

<style>
  .featured {
    @apply lg:(w-[110%] ml-[-5%]);
  }
  .not-featured {
    @apply max-w-screen-sm;
  }
</style>
