<script lang="ts">
  import Toggle from '$lib/components/DarkModeToggle.svelte';
  import { page } from '$app/stores';

  // Put routes in this object in the form -> Name: 'href'
  const routes = {
    'Home': '/',
  };

  $: currentPath = $page.path.substr(0, $page.path.lastIndexOf('/')) || $page.path;
</script>

<!-- FIXME: this is not working for some reason.
  probs a better idea to make it global too and less hacky -->
<noscript>
  <style>
    #no-js {
      @apply hidden;
    }
  </style>
</noscript>

<div class="flex flex-row justify-between w-full py-4">
  <nav class="flex flex-row space-x-4">
    {#each Object.entries(routes) as [name, href] (name) }
      <div class="text-lg sm:text-base">
        <a {href} sveltekit:prefetch class="text-gray-500 transition-shadow hover:text-green-800 dark:hover:text-green-100 shadow-thin hover:shadow-thick ring-green-500 dark:ring-opacity-40 ring-opacity-25 dark:text-gray-400" class:selected={currentPath === href}>{name}</a>
      </div>
    {/each}
  </nav>
  <div id="no-js">
    <Toggle />
  </div>
</div>

<style>
  .selected {
    @apply text-gray-900;
  }

  html.dark * .selected {
    @apply text-gray-200;
  }
</style>
