<script lang="ts">
  /**
   * any class name
   */
  let classNames: string = '';

  export { classNames as class };

  export let style: string = '';

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

<span {title} {style} class="material-icons {classNames}">{iconName}</span>
