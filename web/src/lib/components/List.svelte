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

<ul>
  {#each items as item}
    <slot {item} ></slot>
  {:else}
    <li>
      {emptyMessage}
    </li>
  {/each}
</ul>
