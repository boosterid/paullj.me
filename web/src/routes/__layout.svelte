<script lang="ts">
  import 'virtual:windi.css';
  import '../app.css'

  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  import { fade } from 'svelte/transition';

  import navigation from '$lib/stores/navigation';
  import LoadingBar from '$lib/components/LoadingBar.svelte';
</script>

<svelte:window
  on:sveltekit:navigation-start={() => {
    $navigation = 'loading';
  }}
  on:sveltekit:navigation-end={() => {
    $navigation = 'loaded';
  }}
/>

{#if $navigation === 'loading'}
  <div out:fade={{ delay: 500 }}>
    <LoadingBar />
  </div>
{/if}

<div class="flex flex-col max-w-screen-md min-h-screen px-4 py-2 mx-auto">
  <div class="flex-shrink-0 mt-2">
    <Header></Header>
  </div>

  <main class="flex-grow pt-4 sm:pt-6">
    <slot></slot>
  </main>

  <div class="flex-shrink-0">
    <Footer></Footer>
  </div>
</div>

<!-- FIXME: this is not working for some reason.
  probs a better idea to make it global too and less hacky -->
<noscript>
  <style global>
    .no-js-hidden {
      @apply hidden;
    }
  </style>
</noscript>
