<script lang="ts">
  import { generateImage } from '$lib/utils/generateImage';

  import type { NormalizedCustomBlock } from 'pote-parse';
  import Figure from './Figure.svelte';

  export let block: NormalizedCustomBlock;


  const caption: string = block.fields.caption as string;
  const image = generateImage(block.fields.image);
</script>

<Figure {image} {caption}></Figure>
