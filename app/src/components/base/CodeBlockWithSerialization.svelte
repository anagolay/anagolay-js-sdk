<script lang="ts">
import { serialize } from '$src/utils/json';
import Pre from './Pre.svelte';

let classNames: string = '';
export { classNames as class };

export let code: Record<any, any> | [];

export let space: number = 2;
</script>

<Pre class="{classNames}">{serialize(code, space)}</Pre>
