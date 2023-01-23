<script>
import No5 from '$src/assets/icons/No5.svg';
</script>

<div class="flex flex-col justify-center items-center text-center gap-2">
  <img class="w-32" src="{No5}" alt="" />
  <p class="prose w-80">
    You don't have any accounts. To send tips you need to create or import one or more accounts.
  </p>
  <div class="flex flex-row justify-between">
    <a href="/accounts/create" class="btn btn-primary">Create</a>
    <div class="divider divider-vertical">OR</div>
    <a href="/accounts/importFromSeed" class="btn btn-primary">Import</a>
  </div>
</div>
