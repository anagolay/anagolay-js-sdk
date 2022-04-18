<script type="ts">
  import Drawflow from 'drawflow';
  import './drawflow.css';
  import { onMount } from 'svelte';

  import { workflowGraph, addedNodesIds, workflowManifest } from './stores';
  import { last } from 'remeda';
  import type { OperationsFixture } from '$src/fixtures/operations';
  import { AnForWhat } from '@anagolay/types';

  /**
   * Drawflow editor
   */
  let editor: Drawflow;

  /**
   * For setting the Drawflow canvas hight
   */
  let innerHeight: number;

  /**
   * Wrap the Drawflow addNode method with setting the correct id
   * @param node
   */
  export function addNode(node: OperationsFixture) {
    const {
      data: { name, inputs, output, groups, config },
      versions,
    } = node;

    const id = last(versions);

    const d: [string, number, number, number, number, string, any, string, string | boolean] = [
      name,
      inputs.length || 1,
      1, // always only one output
      ($addedNodesIds.length + 1) * 80,
      ($addedNodesIds.length + 1) * 40,
      'bg-base-300',
      {}, //{ inputs, output, groups, config },
      `<div class="">
        <span class="w-fit text-lg">${name}</span>
      </div>`,
      false,
    ];

    editor.nodeId = id;
    editor.addNode(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8]);

    workflowGraph.addNode(node);
    workflowManifest.generate();
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

  export function reset() {
    editor.removeModule('workflow');
    editor.addModule('workflow');
    editor.changeModule('workflow');
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

    editor.on('nodeRemoved', (id) => {
      console.debug('Node removed ', id);
      workflowGraph.removeNode(id as unknown as string);
      workflowManifest.generate();
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

      const currentNode = workflowGraph.getNodeById(input_id);
      const incommingNode = workflowGraph.getNodeById(output_id);

      const {
        id,
        data: { inputs, groups },
      } = currentNode;

      // this is left like this intentionally, much nicer to read this than if i would destruct it all
      const currentNodeType = inputs;
      const incommingNodeType = incommingNode.data.output;

      if (!groups.includes(AnForWhat.FLOWCONTROL)) {
        if (!currentNodeType.includes(incommingNodeType)) {
          editor.removeSingleConnection(output_id, input_id, output_class, input_class);
          console.error('Got %s as output and %s as input', incommingNodeType, currentNodeType);
        }
      } else {
        // if we have the input of [] this means the node accepts N amount of inputs of the same type
        if (inputs.length === 0) {
          editor.addNodeInput(id);
        } else if (inputs.length > 1) {
          console.log('have flowcontrol op, check that all the inputs have the same type');
        } else {
          console.log('FC operation else condition', currentNode);
        }
      }

      // Update the store
      workflowGraph.addEdge({
        fromNode: incommingNode,
        toNode: currentNode,
      });

      workflowManifest.generate();
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
