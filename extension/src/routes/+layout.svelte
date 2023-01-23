<script lang="ts">
import '$src/app.css';
import '@fontsource/fira-mono';

import { onMount } from 'svelte';

import { type InitError, appStore, checkingVerification, showErrorsView } from '$src/appStore';
import Error from '$src/components/Error.svelte';
import LoadingScreen from '$src/components/LoadingScreen.svelte';
import Navbar from '$src/components/Navbar.svelte';
import Notifications from '$src/components/notifications/Notifications.svelte';
import { isDev } from '$src/utils/isDev';
import { getSentry, initSentry } from '$src/utils/sentry';

let invalidUrl = false;

if (!isDev()) {
  initSentry({
    environment: isDev ? `dev:extensionApp` : 'prod:extensionApp',
    enabled: true
  });
}

onMount(() => {
  // this must be here for now, the appStore.init() depends on the chrome port
  // appStore.checkContentScript().then(appStore.init);
  appStore
    .init()
    .then(() => {
      window.localStorage.setItem('debug', 'anagolayjs:*');
    })
    .catch((error) => {
      const e: InitError = JSON.parse(error.message);
      getSentry().captureException(e.message);
      if (e.invalidUrl) {
        invalidUrl = true;
        checkingVerification.set(false);
      }
    });
});
$: showErrorsView &&
  console.debug(
    'Not implemented yet. chrome had issues with this, keeping it for the future. showErrorsView %s',
    showErrorsView
  );
</script>

<div class="w-[580px] h-[420px]">
  {#if invalidUrl}
    <Error title="ERROR, Invalid URL">
      Anagolay Extension cannot run on this tab. The url doesn't start with <span class="badge badge-info">
        http
      </span>
      or <span class="badge badge-info">https</span>
    </Error>
  {:else if $checkingVerification && !invalidUrl}
    <div class="flex justify-center items-center h-full">
      <LoadingScreen />
    </div>
  {:else}
    <Notifications />
    <Navbar />
    <main class="container mx-auto p-4 h-full">
      <slot />
    </main>
  {/if}
</div>

<style>
:global(body) {
  font-family: 'Fira Mono', sans-serif;
}
</style>
