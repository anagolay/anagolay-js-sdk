<script lang="ts">
  /**
   * any class name
   */
  export let classNames: string = '';
  /**
   * @remark
   * This is the ligature of the material icon that you load via link tag
   */
  export let iconName: string;

  /**
   * HTML title
   */
  export let title: string = '';
</script>

<span {title} class={`material-icons ${classNames}`}>{iconName}</span>
