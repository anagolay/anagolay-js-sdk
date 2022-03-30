<script type="ts">
  import Drawflow from 'drawflow';
  import { onMount } from 'svelte';
  import { makeOps, type OperationsFixture } from '$src/fixtures/operations';

  // only getting the fixtures
  let opsFixtures: Promise<OperationsFixture[]> = makeOps();

  /// Draflow editor
  let editor: Drawflow;

  // workaround for the missing deduplication
  let addedNodes: string[] = [];

  onMount(async () => {
    const id = document.getElementById('drawflow');
    editor = new Drawflow(id);

    editor.reroute = true;
    editor.reroute_fix_curvature = true;
    editor.force_first_input = false;

    editor.start();

    editor.addModule('workflow');
    editor.changeModule('workflow');

    editor.on('nodeMoved', function (id) {
      console.log('Node moved ', id);
    });
    editor.on('connectionStart', function ({ output_id, output_class }) {
      console.log('Node connectionStart ', output_id, output_class);
    });
    editor.on('connectionSelected', function ({ output_id, input_id, output_class, input_class }) {
      console.log('Node connectionSelected ', { output_id, input_id, output_class, input_class });
    });
    editor.on('connectionCreated', function ({ output_id, input_id, output_class, input_class }) {
      console.log('Node connectionCreated ', { output_id, input_id, output_class, input_class });
      const inputNodeType = editor.getNodeFromId(input_id).data.input;
      const outputNodeType = editor.getNodeFromId(output_id).data.output;

      console.log(inputNodeType.includes(outputNodeType));

      if (!inputNodeType.includes(outputNodeType)) {
        editor.removeSingleConnection(output_id, input_id, output_class, input_class);
        console.error('Got %s as output and %s as input', outputNodeType, inputNodeType);
      }
    });
  });

  // add the node to the drawer
  function addNode(data: OperationsFixture) {
    const {
      id,
      data: { name, input, output },
      versions,
    } = data;
    if (addedNodes.includes(id)) {
      throw new Error(`Node already added ${id}`);
    }
    editor.nodeId = id;
    editor.addNode(
      name,
      input.length,
      1,
      addedNodes.length * 40,
      addedNodes.length * 40,
      'bg-accent',
      { input, output, versions },
      name,
      false
    );
    addedNodes = [...addedNodes, id];
  }

  function allowDrop(ev) {
    ev.preventDefault();
    console.log('allowDrop invoked', ev);
  }

  function drag(ev) {
    console.log('drag invoked', ev);
  }

  function drop(ev) {
    console.log('drop invoked', ev);
  }
</script>

<!-- <div data-theme="retro"> -->
<div data-theme="synthwave">
  <!-- <div> -->
  <div class="flex flex-row">
    <div class="static">
      <div class="relative h-full w-96 bg-secondary-content">
        <div class="absolute inset-y-0 left-0 ">
          <div class="stats shadow w-fit mx-8 my-8">
            <div class="stat place-items-center">
              <div class="stat-title">Operations</div>
              <div class="stat-value text-primary">{addedNodes.length || 0}</div>
              <div class="stat-desc">Unique amount of operations in this workflow</div>
            </div>
          </div>

          <div>
            {#await opsFixtures}
              <p>...waiting for fixtures</p>
            {:then opsFixtures}
              {#each opsFixtures as op, i}
                <div class="card w-4/6 mx-8 my-8 bg-primary text-primary-content">
                  <div class="card-body">
                    <h2 class="card-title">{op.data.name}</h2>
                    <p>{op.data.description}</p>
                    <p class="text-xs">{op.id}</p>
                    <div class="card-actions justify-end">
                      <button class="btn btn-sm btn-wide" on:click={() => addNode(op)}>Add ></button>
                    </div>
                  </div>
                </div>
              {/each}
            {:catch error}
              <p style="color: red">{error.message}</p>
            {/await}
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        id="drawflow"
        class="custom100vh flex-auto"
        on:drag={drag}
        on:drop={drop}
        on:dragover={allowDrop}
      />
    </div>
  </div>
</div>

<style>
  .custom100vh {
    height: 100vh;
  }
</style>
