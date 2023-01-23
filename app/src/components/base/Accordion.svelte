<script lang="ts">
let classNames: string = '';
export { classNames as class };
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  tabindex="0"
  class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-full {classNames}"
>
  <input type="checkbox" />

  <div class="collapse-title">
    <slot name="title" />
  </div>
  <div class="collapse-content">
    <slot name="content" />
  </div>
</div>
