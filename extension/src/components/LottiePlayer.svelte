<script lang="ts">
import lottie from 'lottie-web';
import { onMount } from 'svelte';

// props
export let src: string;
export let loop = true;
export let autoplay = true;

let extraClass = '';
export { extraClass as class };

let element: HTMLDivElement;

onMount(() => {
  lottie.loadAnimation({
    container: element, // the dom element that will contain the animation
    renderer: 'svg',
    loop,
    autoplay,
    path: src, // the path to the animation json
    rendererSettings: {}
  });
  lottie.play();
});
</script>

<div class="{extraClass}" bind:this="{element}"></div>
