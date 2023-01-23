<script lang="ts">
import { polkadotIcon } from '@polkadot/ui-shared';

import Circle from './Circle.svelte';

let classNames = 'h-10 w-10';
export { classNames as class };

export let address: string;
export let height = '1';
export let width = '1';
export let style = '';
export let viewBox = '0 0 64 64';

let circles = polkadotIcon(address, { isAlternative: false });

$: circles = polkadotIcon(address, { isAlternative: false });
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class="h-10 w-10 {classNames}"
  height="{height}"
  id="{address}"
  name="{address}"
  style="{style}"
  viewBox="{viewBox}"
  width="{width}"
>
  {#each circles as item}
    <Circle {...item} />
  {/each}
</svg>
