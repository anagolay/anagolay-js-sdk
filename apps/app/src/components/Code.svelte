<script lang="ts">
  export let code: Record<any, any> | [];
  export let replacer: null | any = null;
  export let space: number = 2;
</script>

<div class="lg:container mx-auto bg-info-content">
  <pre>{JSON.stringify(code, replacer, space)}</pre>
</div>
