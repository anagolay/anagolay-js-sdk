<script lang="ts">
/**
 * any class name
 */
let classNames: string = '';

export { classNames as class };

export let title: string;
</script>

<div
  class="flex flex-1 min-w-fit stats shadow hover:bg-base-300 transition ease-in-out delay-150 hover:-translate-y-1  duration-300 {classNames}"
>
  <div class="stat text-right">
    <div class="stat-title">{title}</div>
    <div class="stat-value">
      <slot />
    </div>
  </div>
</div>
