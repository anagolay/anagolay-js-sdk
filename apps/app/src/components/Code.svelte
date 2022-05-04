<script lang="ts">
  import { serialize } from '@anagolay/utils/lib/json';

  let classNames: string = '';
  export { classNames as class };

  export let code: Record<any, any> | [];

  export let space: number = 2;
</script>

<div class="lg:container mx-auto ">
  <pre class={classNames}>{serialize(code, 2)}</pre>
</div>
