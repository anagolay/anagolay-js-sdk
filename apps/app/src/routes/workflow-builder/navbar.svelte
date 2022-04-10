<script lang="ts">
  import MaterialIcon from '$src/components/MaterialIcon.svelte';
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost btn-circle" for="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          /></svg
        >
      </label>
      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a href="/">/ <MaterialIcon classNames="" iconName="home" /></a>
        </li>
      </ul>
    </div>
  </div>
  <div class="navbar-center">
    <span class="p-1 normal-case text-xl">Anagolay Workflow Builder</span>
  </div>
  <div class="navbar-end">
    <div class="dropdown  dropdown-end">
      <lael tabindex="0" class="btn btn-ghost btn-circle" for="">
        <div class="w-10 rounded-full">
          <img
            alt=""
            src="https://ipfs.anagolay.network/ipfs/QmTbeJniR8i4GwfrpXSi5QbVibSzsK8biJ3KeF765PWDN8?filename=anagolay-round_bb_gl144.png"
          />
        </div>
      </lael>
      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li class="m-2">
          <a href="https://anagolay.dev" target="_blank" alt="Dev portal">Dev portal</a>
        </li>
        <li class="m-2">
          <a href="https://anagolay.network" target="_blank" alt="Main website">Main website</a>
        </li>
      </ul>
    </div>
  </div>
</div>
