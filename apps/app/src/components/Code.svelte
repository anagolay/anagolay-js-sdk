<script lang="ts">
  let classNames: string = '';
  export { classNames as class };

  export let code: Record<any, any> | [];

  /**
   * This is the custom replacer for dealing with the Map
   * @param _key - unused
   * @param value - any value
   */
  export let replacer: null | any = (_key: any, value: any) => {
    if (value instanceof Map) {
      return Object.fromEntries(value);
    } else {
      return value;
    }
  };
  export let space: number = 2;
</script>

<div class="lg:container mx-auto ">
  <pre class={classNames}>{JSON.stringify(code, replacer, space)}</pre>
</div>
