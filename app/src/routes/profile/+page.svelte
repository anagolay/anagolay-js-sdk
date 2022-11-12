<script context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { browser } from '$app/environment';
  import { debugName as appStoreDebug } from '$src/appStore';
  import { debugName as polkadotStoreDebug } from '$src/components/polkadot/store';
  import { debugName as workflowBuilderDebug } from '$src/routes/workflow-builder/+page.svelte';

  let debugLogsEnabled: boolean = false;

  function toggleCheckbox() {
    if (browser) {
      debugLogsEnabled = !debugLogsEnabled;

      let debug = '';

      if (!debugLogsEnabled) {
        window.localStorage.removeItem('debug');
      } else {
        debug = [appStoreDebug, polkadotStoreDebug, workflowBuilderDebug, 'anagolayjs:*'].join(',');
        window.localStorage.setItem('debug', debug);
      }
    }
  }

  $: {
    if (browser) {
      window.localStorage.getItem('debug') ? true : false;
      debugLogsEnabled = !!window.localStorage.getItem('debug');
    }
  }
</script>

<div class="w-96 p-4">
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Enable debug logs</span>
      <input type="checkbox" class="toggle" on:change={toggleCheckbox} bind:checked={debugLogsEnabled} />
    </label>
  </div>
</div>
