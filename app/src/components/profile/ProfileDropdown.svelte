<!-- svelte-ignore a11y-label-has-associated-control -->
<script lang="ts">
import MaterialIcon from '../base/MaterialIcon.svelte';
type optionType = { value: 'string'; text: 'string' };
export let options: optionType[] = [];
export let action: (value: string) => void;
export let iconName = '';
let dropdownTitle = options[0].text;

function handleClick(option: optionType) {
  const { value, text } = option;
  action(value);
  dropdownTitle = text;
  (document.activeElement as HTMLElement).blur();
}
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

<div class="dropdown w-60">
  <label tabindex="0" class="btn btn-sm btn-outline flex items-center w-full justify-between py-0">
    {#if iconName}
      <MaterialIcon iconName="{iconName}" class="bg-transparent px-1" />
    {/if}
    {dropdownTitle}
    <MaterialIcon iconName="expand_more" />
  </label>
  <ul
    tabindex="0"
    class="dropdown-content absolute menu p-1 rounded-lg shadow-lg shadow-black w-52 bg-base-100 z-20"
  >
    {#each options as option}
      <li>
        <button
          class="cursor-pointer hover:bg-base-200 p-2"
          on:click|preventDefault="{() => handleClick(option)}"
          on:keypress>{option.text}</button
        >
      </li>
    {/each}
  </ul>
</div>
