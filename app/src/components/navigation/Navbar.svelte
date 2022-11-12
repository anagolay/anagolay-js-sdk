<script lang="ts">
  import { showSidebar } from '$src/appStore';
  import MaterialIcon from '$src/components/base/MaterialIcon.svelte';
  import ThemeChange from '$src/components/themeChange/ThemeChange.svelte';

  import SelectNetwork from '../selectNetwork/SelectNetwork.svelte';
</script>

<!-- <div
    classP="sticky top-0 z-30 h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100"> -->

<div class="navbar bg-base-200 shadow z-50">
  <div class="flex flex-1 md:gap-1 lg:gap-2">
    <span class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]" data-tip="Menu">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <label
        for="drawer"
        class="btn btn-square btn-ghost drawer-button"
        on:click={() => showSidebar.set(!$showSidebar)}
      >
        <MaterialIcon iconName="menu" />
      </label>
    </span>
    <SelectNetwork />
  </div>
  <div class="flex-0">
    <ThemeChange />
  </div>
</div>
