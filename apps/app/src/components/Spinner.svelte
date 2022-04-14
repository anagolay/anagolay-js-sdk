<script lang="ts">
  /**
   * Spinner size, defaults to 8. this is part of the `w-` in tailwind
   */
  // export let size: string = '8';

  /**
   * Border color as a Tailwind class `border-*`
   * @defaults `border-purple-500`
   */
  export let outerBorder: string = 'border-purple-500';

  /**
   * Border color as a Tailwind class `border-*`
   * @defaults `border-gray-200`
   */
  export let innerBorder: string = 'border-gray-200';
</script>

<div class="flex p-2">
  <div class="relative">
    <!-- Outer Ring-->
    <div class="w-8 h-8 rounded-full absolute file:border-8 border-solid {innerBorder}" />

    <!-- Inner Ring -->
    <div
      class="w-8 h-8 rounded-full animate-spin absolute border-8 border-solid {outerBorder} border-t-transparent shadow-md"
    />
  </div>
</div>
