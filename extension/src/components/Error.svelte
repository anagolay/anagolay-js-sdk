<script lang="ts">
import LottiePlayer from './LottiePlayer.svelte';

export let title: string = 'Error';
export let showAnimation: boolean = true;
</script>

<div class="p-4 flex flex-col justify-center items-center h-full">
  {#if showAnimation}
    <LottiePlayer class="h-52 p-0" src="/lottie/full_error_animation.json" />
  {/if}

  <div class="prose text-center text-error text-lg">{title}</div>
  <div class="prose text-center">
    <slot />
  </div>
</div>
