<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<script lang="ts">
import { Icon } from 'svelte-awesome';
import infoCircle from 'svelte-awesome/icons/infoCircle';
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->

<div class="dropdown dropdown-end">
  <label tabindex="0" class="btn-xs text-info">
    <Icon data="{infoCircle}" />
  </label>
  <div tabindex="0" class="card compact dropdown-content shadow bg-slate-300 rounded-box w-72 text-base-300">
    <div class="card-body">
      <span class="card-title text-sm"></span>
      <p>
        This creator didn't sign up yet. Please visit this website again to see did they verify. You can also
        let them know on social media that you would like to sponsor them.
      </p>
    </div>
  </div>
</div>
