<script lang="ts">
  let classNames: string = '';
  export { classNames as class };
</script>

<div
  class="rounded-md backdrop-blur-md bg-white/25 shadow-lg border border-solid border-white/30 flex flex-1 justify-center align-middle items-center hover:bg-purple-200/10  transition duration-150 ease-in-out {classNames}"
>
  <slot />
</div>
