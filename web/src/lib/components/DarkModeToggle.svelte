<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Moon from '@svicons/remix-line/moon.svelte';
  import Sun from '@svicons/remix-line/sun.svelte';

  import { storable } from '$lib/stores/storable';

  const preferredTheme = storable('theme');

  let darkMode = false;
  $: if (typeof window != 'undefined') {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }
  onMount(() => {
    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkMode = $preferredTheme ? $preferredTheme === 'dark' : darkMediaQuery.matches;
    try {
      // Chrome & Firefox
      darkMediaQuery.addEventListener('change', e => {
        darkMode = e.matches;
      });
    } catch (e1) {
      try {
        // Safari
        darkMediaQuery.addListener(e => {
          darkMode = e.matches;
        });
      } catch (e2) {
        console.error(e2);
      }
    }
  });
  const toggleMode = () => {
    darkMode = !darkMode;
    $preferredTheme = darkMode ? 'dark' : 'light';
  };
</script>

<label for="nightModeCheckbox">
  <div class="relative inline-block align-middle bg-transparent cursor-pointer select-none w-8 h-8 sm:w-6 sm:h-6"
      class:hover:text-orange-300={darkMode}
      class:hover:text-light-blue-600={!darkMode}>
      {#if darkMode}
        <span in:fade={{ delay: 100, duration: 100}} >
          <Sun/>
        </span>
        {:else}
        <span in:fade={{ delay: 100, duration: 100}} >
          <Moon/>
        </span>
      {/if}
    <input id="nightModeCheckbox" on:input={toggleMode} type="checkbox" class="inline sr-only" checked={darkMode} />
  </div>
  <span class="ml-2 cursor-default sr-only">Nightmode Toggle</span>
</label>
