<script lang="ts">
  import MaterialIcon from '$src/components/base/MaterialIcon.svelte';
  import type { Alert } from './stores';
  import { fade } from 'svelte/transition';

  let classNames: string = '';
  export { classNames as class };

  export let infoLevel: 'info' | 'success' | 'warning' | 'error' | '' = '';

  export let data: Alert;

  let alertCss: string;

  $: alertCss = infoLevel !== '' ? `alert-${infoLevel}` : '';
</script>

{#if infoLevel === ''}
  <div class="alert shadow-lg fixed w-fit bottom-7 right-7 {classNames}" transition:fade>
    <div>
      <p>{data.text}</p>
    </div>
    <button on:click={data.closeFn}>
      <MaterialIcon iconName="cancel" />
    </button>
  </div>
{:else if infoLevel === 'info'}
  <div class="alert alert-info shadow-lg fixed w-fit bottom-7 right-7 {classNames}" transition:fade>
    <div>
      <p>{data.text}</p>
    </div>
    <button on:click={data.closeFn}>
      <MaterialIcon iconName="cancel" />
    </button>
  </div>
{:else if infoLevel === 'warning'}
  <div class="alert alert-warning shadow-lg fixed w-fit bottom-7 right-7 {classNames}" transition:fade>
    <div>
      <p>{data.text}</p>
    </div>
    <button on:click={data.closeFn}>
      <MaterialIcon iconName="cancel" />
    </button>
  </div>
{:else if infoLevel === 'success'}
  <div
    class="alert {alertCss} alert-success shadow-lg fixed w-fit bottom-7 right-7 {classNames}"
    transition:fade
  >
    <div>
      <p>{data.text}</p>
    </div>
    <button on:click={data.closeFn}>
      <MaterialIcon iconName="cancel" />
    </button>
  </div>
{:else if infoLevel === 'error'}
  <div
    class="alert {alertCss} alert-error shadow-lg fixed w-fit bottom-7 right-7 {classNames}"
    transition:fade
  >
    <div>
      <p>{data.text}</p>
    </div>
    <button on:click={data.closeFn}>
      <MaterialIcon iconName="cancel" />
    </button>
  </div>
{/if}
