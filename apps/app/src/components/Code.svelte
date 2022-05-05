<script lang="ts">
  import { serialize } from '$src/utils/json';

  let classNames: string = '';
  export { classNames as class };

  export let code: Record<any, any> | [];

  export let space: number = 2;
</script>

<div class="lg:container mx-auto ">
  <pre class={classNames}>{serialize(code, space)}</pre>
</div>
