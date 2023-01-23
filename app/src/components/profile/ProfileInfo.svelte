<div class="dropdown dropdown-end dropdown-hover">
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label tabindex="0" class="btn btn-circle btn-ghost btn-xs cursor-default">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg
    >
  </label>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div tabindex="0" class="card compact dropdown-content bg-base-100 rounded-box w-64 shadow-lg shadow-black">
    <div class="card-body">
      <slot />
    </div>
  </div>
</div>
