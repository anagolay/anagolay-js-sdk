<script>
import { steps } from '../store';
</script>

<ul class="steps steps-vertical w-1/4 sticky top-0 h-fit">
  {#each $steps.steps as step}
    <li style="text-align: left;" class="step {step.class}">{step.title}</li>
  {/each}
</ul>
