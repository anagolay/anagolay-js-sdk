<script type="ts">
  import Drawflow from 'drawflow';
  import './drawflow.css';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import type { NodeToAdd } from './interfaces';

  import { workflow } from './stores';

  const dispatch = createEventDispatcher();

  /**
   * Drawflow editor
   */
  let editor: Drawflow;

  /**
   * For setting the workflow canvas hight
   */
  let innerHeight: number;

  /**
   * Wrap the Drawflow addNode method with setting the correct id
   * @param currentNodeToAdd
   */
  export function addNode(currentNodeToAdd: NodeToAdd) {
    const { id, data: d } = currentNodeToAdd;
    editor.nodeId = id;
    editor.addNode(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8]);
  }
  /**
   * Remove the node and propagate the changes
   * @param id
   */
  export function removeNode(id: string) {
    console.log('got the remove node ', id);

    dispatch('removeNode', { id });
  }

  export function createWorkflow() {
    dispatch('createWorkflow');
  }

  /**
   * Exposed and wrapped all nodes
   */
  export function allNodes() {
    return editor.drawflow.drawflow.workflow;
  }

  export function getNodeFromId(id: string) {
    return editor.getNodeFromId(id);
  }

  onMount(async () => {
    const id = document.getElementById('drawflow');
    editor = new Drawflow(id);
    editor.reroute = true;
    editor.reroute_fix_curvature = true;
    editor.force_first_input = true;

    editor.start();

    // default module is `Home` so we create our own module which will not conflict
    editor.addModule('workflow');
    editor.changeModule('workflow');

    // setting up the callbacks for the events
    editor.on('nodeCreated', function (id) {
      console.debug('Node created ', id);
    });

    editor.on('nodeRemoved', function (id) {
      console.debug('Node removed ', id);
      // this is needed since thorig lib uses number, with time i will write this by myself
      removeNode(id as unknown as string);
    });

    editor.on('nodeMoved', function (id) {
      // console.debug('Node moved ', id);
    });

    editor.on('connectionStart', function ({ output_id, output_class }) {
      console.debug('Node connectionStart ', output_id, output_class);
    });

    editor.on('connectionSelected', function ({ output_id, input_id, output_class, input_class }) {
      console.debug('Node connectionSelected ', { output_id, input_id, output_class, input_class });
    });

    // here we check can we create the connection. Due to the way library is made, this is the ONLY way
    editor.on('connectionCreated', function ({ output_id, input_id, output_class, input_class }) {
      console.debug('Node connectionCreated ', { output_id, input_id, output_class, input_class });

      const currentNode = editor.getNodeFromId(input_id);
      const incommingNode = editor.getNodeFromId(output_id);

      const currentNodeType = currentNode.data.input;
      const incommingNodeType = incommingNode.data.output;

      // console.log('input node', currentNode);
      // console.log('output node', incommingNode);

      if (!currentNodeType.includes(incommingNodeType)) {
        editor.removeSingleConnection(output_id, input_id, output_class, input_class);
        console.error('Got %s as output and %s as input', incommingNodeType, currentNodeType);
      }

      // Update the store
      workflow.addConnection({
        fromNode: currentNode,
        toNode: incommingNode,
      });
      createWorkflow();
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
