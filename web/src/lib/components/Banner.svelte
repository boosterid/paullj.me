<script lang="ts">
  import Image from "./Image.svelte";

  export let avatar: ImageProps = null;
  export let description: string = null;
</script>

<div class="flex flex-row">
  <div class="flex-none w-16 h-16 overflow-hidden rounded-full">
    {#if avatar}
      <Image {...avatar}></Image>
    {:else}
      <div class="w-full h-full bg-gradient-to-br from-green-600 to-green-900" />
    {/if}
  </div>
  <div class="flex-1 ml-4 text-sm font-light sm:text-base">
    {description}
  </div>
</div>
