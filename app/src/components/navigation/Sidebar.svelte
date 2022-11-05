<script lang="ts">
import { page } from '$app/stores';
import MaterialIcon from '$src/components/base/MaterialIcon.svelte';
import { appPages } from './data';
import { version } from '$src/../package.json';
import PolkadotAccounts from '$src/components/polkadotAccounts/PolkadotAccounts.svelte';
import NetworkQuickInfo from '$src/components/selectNetwork/NetworkQuickInfo.svelte';
import FundsAvaliable from '../FundsAvaliable.svelte';
</script>

<!-- this doesn't need the class drawer, it messes up the overlay -->
<aside class="drawer-side min-h-screen bg-base-200 sticky top-0 w-64 z-50">
  <div class="flex flex-col">
    <div class="flex flex-col">
      <PolkadotAccounts class="p-4" />
      <FundsAvaliable />
    </div>
    <div>
      <ul tabindex="0" class="menu menu-compact mt-3 p-2 rounded-box gap-2 flex-1">
        {#each appPages as { name, iconClassName, href }}
          <li>
            <a
              href="{href}"
              id="{$page.url.pathname.startsWith(href + '/') ? 'active-menu' : ''}"
              class="{`flex ${$page.url.pathname == href ? 'active' : ''} ${
                $page.url.pathname.startsWith(href + '/') ? 'active' : ''
              }`}"
            >
              <MaterialIcon iconName="{iconClassName}" />
              {name}
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <div class="absolute bottom-0 w-full">
      <div class="flex flex-col justify-between items-end">
        <div class="p-2 w-full">
          <NetworkQuickInfo />
        </div>
        <!-- logo and version section -->
        <div
          class="bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 flex justify-end items-center gap-2 px-4 py-2 lg:flex w-full"
        >
          <a href="/" aria-current="page" aria-label="Homepage" class="flex-0 btn btn-ghost px-2">
            <div class="font-title text-primary inline-flex text-sm transition-all duration-200 md:text-xl">
              <span class="lowercase">Anagolay</span>
              <span class="text-base-content uppercase">js</span>
            </div>
          </a>
          <span class="font-mono text-xs text-opacity-50">
            {version}
          </span>
        </div>
      </div>
    </div>
  </div>
</aside>
