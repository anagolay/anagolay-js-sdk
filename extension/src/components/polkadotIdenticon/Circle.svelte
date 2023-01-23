<script context="module" lang="ts">
  export interface Circle {
    cx: number;
    cy: number;
    fill: string;
    r: number;
  }
</script>

<script lang="ts">
  export let cx: number;
  export let cy: number;
  export let fill = 'currentColor';
  export let r: number;
</script>

<circle cx="{cx}" cy="{cy}" fill="{fill}" r="{r}"></circle>
