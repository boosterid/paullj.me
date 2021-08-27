<script lang="ts">
  import { onMount } from 'svelte';
  import { blur } from '$lib/utils/blur';
  import { inview } from 'svelte-inview';

  export let lazyLoad = true;

	export let src: string;
	export let alt: string;

	export let aspectRatio: number = null;
	export let placeholder: string = null;
	export let srcset: string = null;
	export let sizes: string = 'auto' // 'auto' only works when using `lazysizes`

  let inView = false;
  let isLoaded = false;

  let nativeLoading = false

  // Determine whether to bypass our intersecting check
  onMount(() => {
    if ('loading' in HTMLImageElement.prototype) {
      nativeLoading = true
    }
    console.log(isLoaded);
  });

  const inviewOptions = {
    rootMargin: '50px',
    unobserveOnEnter: true,
  };

  const handleChange = (event: Event) => {
    // FIXME: Use proper types, relies on https://github.com/maciekgrzybek/svelte-inview/issues/5
    // Hack to recast as a custom event to include detail
    const { detail } =( event as CustomEvent<{ inView: boolean, entry: IntersectionObserverEntry }>);
    inView = detail.inView;
  };
</script>

<div class="relative overflow-hidden" use:inview={inviewOptions} on:change={handleChange}>
	<div class="aspect-ratio" style="--aspect-w:{aspectRatio}">
    {#if lazyLoad}
      {#if !isLoaded}
        <img class="absolute inset-0 w-full h-full !my-0 scale-105 blur" src={placeholder} {alt}>
      {/if}
      {#if nativeLoading || inView }
        <img in:blur on:introend={()=> isLoaded = true} class="absolute inset-0 w-full h-full !my-0" loading="lazy" {src} {srcset} {sizes} {alt}/>
      {/if}
    {:else}
		  <img class="absolute inset-0 w-full h-full !my-0" {src} {srcset} {sizes} {alt} />
    {/if}

    <!-- TODO: This is probably janky and broken with no js, will probs need the no js styling stuff -->
    <noscript>
		  <img {src} {srcset} {sizes} {alt} />
	  </noscript>
  </div>
</div>

<style>
  .aspect-ratio {
    --aspect-w: 1;
    --aspect-h: 1;
    padding-bottom: calc(var(--aspect-h) / var(--aspect-w) * 100%);
  }
</style>
