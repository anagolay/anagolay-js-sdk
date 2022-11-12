<script lang="ts">
  import { isEmpty } from 'ramda';

  import { notificationsStore } from '../notifications/store';
  import MaterialIcon from './MaterialIcon.svelte';

  let classNames: string = '';
  export { classNames as class };
  export let withCopy: boolean = false;
  export let value: string = '';

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(value);
      notificationsStore.add('Copied to clipboard', 'info');
    } catch (error) {
      notificationsStore.add(`Failed to copy to clipboard. error=${error}`, 'error');
    }
  }
</script>

<code class="overflow-auto bg-base-100 text-base-content m-1 break-all rounded-none {classNames}">
  {#if isEmpty(value)}
    <slot />
  {:else}
    {value}
  {/if}
  {#if withCopy && !isEmpty(value)}
    <button class="btn btn-ghost btn-circle" on:click={copyToClipboard}>
      <MaterialIcon iconName="content_copy" /></button
    >
  {/if}
</code>
