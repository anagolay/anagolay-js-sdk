<script lang="ts">
  let classNames: string = '';
  export { classNames as class };
</script>

<div
  class={`${classNames} rounded-lg backdrop-blur-xl bg-white/25 shadow-lg border border-solid border-white/30 flex flex-1 justify-center align-middle items-center hover:bg-sky-700 transition duration-150 ease-in-out`}
>
  <slot />
</div>
<!-- 
<style>
  .frozen-glass-effect {
    border-radius: 8px;
    backdrop-filter: blur(20px);
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
</style> -->
