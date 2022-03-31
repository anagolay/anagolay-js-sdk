<script type="ts">
  import Drawflow from 'drawflow';
  import './drawflow.css';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { isNil } from 'ramda';

  const dispatch = createEventDispatcher();

  const triggerEvent = () => {
    dispatch('hello', 'Rock');
  };
  /// Draflow editor
  let editor: Drawflow;

  let innerHeight: number;

  export let currentNodeToAdd: any;

  $: if (!isNil(currentNodeToAdd)) {
    const { id, data: d } = currentNodeToAdd;
    console.log('the currentNodeToAdd is ', currentNodeToAdd);
    editor.nodeId = id;
    editor.addNode(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8]);
    console.log(editor);
  }

  // // For now this is how Node adding works
  // export let currentNodeToRemove: string;
  // $: if (!isNil(currentNodeToRemove)) {
  //   console.log('the currentNodeToRemove is ', currentNodeToRemove);
  //   editor.removeNodeId(currentNodeToRemove);
  //   console.log(editor);
  // }

  onMount(async () => {
    const id = document.getElementById('drawflow');
    editor = new Drawflow(id);
    editor.reroute = true;
    editor.reroute_fix_curvature = true;
    editor.force_first_input = false;

    editor.start();

    // default module is `Home` so we create our own module which will not conflict
    editor.addModule('workflow');
    editor.changeModule('workflow');

    // setting up the callbacks for the events
    editor.on('nodeCreated', function (id) {
      console.log('Node created ', id);
    });

    editor.on('nodeRemoved', function (id) {
      console.log('Node removed ', id);
    });

    editor.on('nodeMoved', function (id) {
      console.log('Node moved ', id);
    });

    editor.on('connectionStart', function ({ output_id, output_class }) {
      console.log('Node connectionStart ', output_id, output_class);
    });

    editor.on('connectionSelected', function ({ output_id, input_id, output_class, input_class }) {
      console.log('Node connectionSelected ', { output_id, input_id, output_class, input_class });
    });

    // here we check can we create the connection. Due to the way library is made, this is the ONLY way
    editor.on('connectionCreated', function ({ output_id, input_id, output_class, input_class }) {
      console.log('Node connectionCreated ', { output_id, input_id, output_class, input_class });
      const inputNodeType = editor.getNodeFromId(input_id).data.input;
      const outputNodeType = editor.getNodeFromId(output_id).data.output;

      if (!inputNodeType.includes(outputNodeType)) {
        editor.removeSingleConnection(output_id, input_id, output_class, input_class);
        console.error('Got %s as output and %s as input', outputNodeType, inputNodeType);
      }
      // connectedNodes += 1;
    });
  });

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

<svelte:window bind:innerHeight />

<div
  id="drawflow"
  style="height: {innerHeight}px;"
  class="flex-auto"
  on:drag={drag}
  on:drop={drop}
  on:dragover={allowDrop}
/>
