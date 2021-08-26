<script lang="ts">
  import Image from "./Image.svelte";
  import type { ImageData } from "$lib/models/image";

  export let image: ImageData;
  export let caption: string = null;
</script>

<figure class="w-full">
  <Image {...image}></Image>
  {#if caption}
    <figcaption class="text-center">{caption}</figcaption>
  {/if}
</figure>
