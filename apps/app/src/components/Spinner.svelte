<script lang="ts">
  /**
   * Spinner size, defaults to 12
   */
  export let size: string = '12';

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
    <div
      class="w-{size} h-{size} rounded-full absolute
	border-8 border-solid {innerBorder}"
    />

    <!-- Inner Ring -->
    <div
      class="w-{size} h-{size} rounded-full animate-spin absolute
	border-8 border-solid {outerBorder} border-t-transparent shadow-md"
    />
  </div>
</div>
