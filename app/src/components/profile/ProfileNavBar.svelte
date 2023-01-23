<script context="module">
export const prerender = true;
</script>

<script lang="ts">
import { browser } from '$app/environment';
import { appWideDebug, debugName as appStoreDebug } from '$src/appStore';
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
      debug = [appWideDebug, appStoreDebug, polkadotStoreDebug, workflowBuilderDebug, 'anagolayjs:*'].join(
        ','
      );
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

<div class="flex justify-between items-center w-full bg-base-200">
  <ul class="menu menu-horizontal">
    <li>
      <a href="/profile" class="bg-base-100 text-base-content"> My Channels </a>
    </li>
  </ul>

  <div class="form-control">
    <label class="label cursor-pointer gap-4 px-6">
      <span class="label-text">Enable debug logs</span>
      <input
        type="checkbox"
        class="toggle toggle-primary"
        on:change="{toggleCheckbox}"
        bind:checked="{debugLogsEnabled}"
      />
    </label>
  </div>
</div>
