<script lang="ts">
  type T = $$Generic;

	export let items: Array<T>;
	export let emptyMessage: string = "List empty!";
</script>

<slot name="title" />

<ul class="space-y-4">
  {#each items as item}
    <slot name="item" {item} />
  {:else}
    <li>
      {emptyMessage}
    </li>
  {/each}
</ul>
