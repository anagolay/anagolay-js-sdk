<script lang="ts">
  import { cubicInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  export let title: string;
  export let step: number = 0;
  export let hideContent: boolean = false;
  let classNames: string = '';
  export { classNames as class };
</script>

<div id="step_{step.toString()}" class="bg-base-300 rounded-lg">
  <div class="flex justify-between items-center bg-base-200 p-4 rounded-t-lg">
    <h1 class="">{title}</h1>
    <button class="btn btn-circle btn-ghost" on:click={() => (hideContent = !hideContent)}>
      <svg
        class="h-6 w-6 fill-current md:h-8 md:w-8 rotate-90"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg
      >
    </button>
  </div>
  {#if !hideContent}
    <div transition:fade={{ delay: 50, easing: cubicInOut }} class="p-4 {classNames}">
      <slot />
    </div>
  {/if}
</div>
