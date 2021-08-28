<script lang="ts">
  type T = $$Generic;

  export let id: string = null;
	export let title: string = "List";
	export let items: Array<T>;
	export let emptyMessage: string = "List empty!";
</script>

<h2 {id} class="font-serif text-xl">
  {title}
</h2>

<div class="grid grid-cols-1 gap-2 overflow-hidden sm:grid-cols-3">
  {#each items as item}
    <div class="w-full overflow-hidden">
      <slot {item} ></slot>
    </div>
  {:else}
    {emptyMessage}
  {/each}
</div>
