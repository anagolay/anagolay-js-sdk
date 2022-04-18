<script lang="ts">
  import FrostBox from '$src/components/FrostBox.svelte';
</script>

<div class="container mx-auto px-4 flex flex-col h-screen p-4 bg-gradient-to-b from-blue-500 to-green-500">
  <div class="flex flex-row flex-wrap justify-between h-72">
    <FrostBox class="m-2 basis-72">
      <a
        href="https://anagolay.dev"
        target="_blank"
        class="text-2xl hover:text-white text-slate-800 h-full w-full flex justify-center align-middle items-center"
      >
        Anagolay Dev
      </a>
    </FrostBox>
    <FrostBox class="m-2 basis-72 ">
      <a
        href="https://anagolay.network"
        target="_blank"
        class="text-2xl hover:text-white text-slate-800 h-full w-full flex justify-center align-middle items-center"
      >
        Anagolay Network
      </a>
    </FrostBox>
    <FrostBox class="m-2 basis-72 ">
      <a
        href="https://kelp.digital"
        target="_blank"
        class="text-2xl hover:text-white text-slate-800 h-full w-full flex justify-center align-middle items-center"
      >
        Kelp.digital
      </a>
    </FrostBox>
  </div>
  <div class="flex justify-center align-middle items-center h-full">
    <img class="w-72 h-72" src="anagolay-white-with-text.png" alt="Anagolay Logo" />
  </div>
</div>
