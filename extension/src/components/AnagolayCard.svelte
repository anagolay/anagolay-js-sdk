<script lang="ts">
/**
 * style how the slots are positioned
 */
let classNames: string = '';
export { classNames as class };

export let w = '';
export let h = '';
</script>

<div class="max-w-7xl mx-auto {w} {h}">
  <div class="relative group">
    <div
      class="absolute -inset-1 bg-gradient-to-r from-accent to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
    ></div>
    <div
      class="relative px-4 py-3 bg-base-200 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6"
    >
      <!-- <svg class="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
        ></path>
      </svg> -->
      <div class="space-y-2 flex flex-col {classNames}">
        <slot name="title" />
        <slot name="subtitle" />
      </div>
    </div>
  </div>
</div>
