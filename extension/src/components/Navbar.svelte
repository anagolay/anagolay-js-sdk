<!-- svelte-ignore a11y-label-has-associated-control -->
<script lang="ts">
import { Icon } from 'svelte-awesome';
import addressBookIcon from 'svelte-awesome/icons/addressBook';
import barsIcon from 'svelte-awesome/icons/bars';
import externalLinkIcon from 'svelte-awesome/icons/externalLink';
import plusIcon from 'svelte-awesome/icons/plus';
import uploadIcon from 'svelte-awesome/icons/upload';

import IconTipping from '$src/assets/icon_tipping.svg';

import AccountsDropdown from './accounts/AccountsDropdown.svelte';
import Verification from './verification/Verification.svelte';

const EXTENSION_VERSION = process.env.EXTENSION_VERSION;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

<div class="navbar bg-base-200">
  <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <Icon data="{barsIcon}" />
        <!-- <img class="w-10 h-10" src="{anagolayIcon}" alt="" /> -->
      </label>
      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
      >
        <li class="hover-bordered">
          <a class="" href="/">Tipping</a>
        </li>
        <li class="hover-bordered">
          <a class="" href="/accounts">Accounts</a>
        </li>
        <li class="hover-bordered">
          <a class="" href="/settings">Settings</a>
        </li>
        <!-- ------------ EXTERNAL -------------- -->
        <li class="menu-title">
          <span>External</span>
        </li>
        <li class="hover-bordered">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://anagolay.network?utm_source=anagolay_js_chrome_extension"
          >
            <Icon data="{externalLinkIcon}" />
            Official page
          </a>
        </li>
        <li class="hover-bordered">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://anagolay.dev?utm_source=anagolay_js_chrome_extension"
          >
            <Icon data="{externalLinkIcon}" />
            Docs
          </a>
        </li>
        <li class="hover-bordered">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://app.anagolay.network?utm_source=anagolay_js_chrome_extension"
          >
            <Icon data="{externalLinkIcon}" />
            Explorer App
          </a>
        </li>
        <li>
          <div class="divider"></div>
        </li>
        <li class="disabled flex flex-row justify-between">
          <span class="text-xs">App version:</span>
          <span class="text-xs">{EXTENSION_VERSION}</span>
        </li>
      </ul>
    </div>
    <div class="tooltip tooltip-bottom" data-tip="Go to tipping">
      <a class="btn btn-ghost btn-square" href="/">
        <img src="{IconTipping}" class="p-2" alt="" srcset="" />
      </a>
    </div>
  </div>
  <div class="navbar-center">
    <Verification />
  </div>
  <div class="navbar-end">
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle btn-md">
        <Icon class="h-5 w-5" data="{plusIcon}" />
      </label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-96">
        <li>
          <a href="/accounts/create" class="" title="Create new Account">
            <Icon class="h-5 w-5" data="{addressBookIcon}" />
            Create new account
          </a>
        </li>
        <li>
          <a href="/accounts/importFromSeed">
            <Icon class="h-5 w-5" data="{uploadIcon}" />
            Import from pre-existing seed
          </a>
        </li>
      </ul>
    </div>
    <!-- <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle btn-sm">
        <Icon class="h-5 w-5" data="{cogIcon}" />
      </label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-96">
        <li>
          <a href="/accounts/create" class="" title="Create new Account">Settings A</a>
        </li>
        <li>
          <a href="/accounts/importFromSeed">Settings B</a>
        </li>
      </ul>
    </div> -->

    <AccountsDropdown />
  </div>
</div>
