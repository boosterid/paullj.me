<script lang="ts">
  import { generateImage } from '$lib/utils/generateImage';
  import type { NormalizedCustomBlock } from 'pote-parse';

  import Figure from './Figure.svelte';

  export let block: NormalizedCustomBlock;

  const { featured, caption, image } = block.fields as Sanity.Schema.Figure;
</script>

<Figure image={generateImage(image)} {caption} {featured}></Figure>
