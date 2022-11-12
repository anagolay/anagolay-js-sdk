<script type="ts">
  import './drawflow.css';

  import { AnForWhat, AnOperation, AnOperationVersion } from '@anagolay/types';
  import Drawflow from 'drawflow';
  import { last } from 'remeda';
  import { onMount } from 'svelte';

  import { notificationsStore } from '$src/components/notifications/store';

  import { addedNodesIds, workflow, workflowGraph } from './stores';

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
  export function addNode(node: AnOperation, versions: AnOperationVersion[]) {
    const {
      data: { name, inputs }
    } = node;

    const version = last(versions);
    const id: string = version.id;

    const d: [string, number, number, number, number, string, any, string, string | boolean] = [
      name,
      inputs.length || 1,
      1, // always only one output
      ($addedNodesIds.length + 1) * 80,
      ($addedNodesIds.length + 1) * 40,
      'bg-base-300',
      {}, //{ inputs, output, groups, config },
      `<div>
        <span class="w-fit text-lg">${name}</span>
      </div>`,
      false
    ];

    editor.nodeId = id;
    editor.addNode(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8]);

    workflowGraph.addNode(node, version);
    workflow.generate();
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
      workflow.generate();
    });

    editor.on('nodeMoved', (id) => {
      console.debug('Node moved ', id);
    });

    editor.on('connectionStart', function ({ output_id, output_class }) {
      console.debug('Node connectionStart ', output_id, output_class);
    });

    editor.on('connectionRemoved', function ({ output_id, input_id, output_class, input_class }) {
      console.debug('Node connectionRemoved ', { output_id, input_id, output_class, input_class });

      const currentNode = workflowGraph.getNodeById(input_id);

      const {
        id,
        data: { inputs }
      } = currentNode;

      // if we have the input of [] this means the node accepts N amount of inputs of the same type
      // In this case remove the surplus input when its connection is removed
      if (inputs.length == 0) {
        editor.removeNodeInput(id, input_class);
      }
    });

    editor.on('connectionSelected', function ({ output_id, input_id, output_class, input_class }) {
      console.debug('Node connectionSelected ', { output_id, input_id, output_class, input_class });
    });

    // here we check can we create the connection. Due to the way library is made, this is the ONLY way
    editor.on('connectionCreated', function ({ output_id, input_id, output_class, input_class }) {
      console.debug('Node connectionCreated ', { output_id, input_id, output_class, input_class });

      const currentNode = workflowGraph.getNodeById(input_id);
      const incommingNode = workflowGraph.getNodeById(output_id);

      // traverse from output to output starting from the new connection to see if it would create a loop
      const traversed = [];
      let traverseNode = incommingNode;
      let traverseTo = input_id;
      do {
        traversed.push(traverseNode.id);
        traverseNode = workflowGraph.getNodeById(traverseTo);
        if (traversed.includes(traverseNode.id)) {
          editor.removeSingleConnection(output_id, input_id, output_class, input_class);
          console.error('This connection would create a loop');
          notificationsStore.add('This connection would create a loop', 'error');
          return;
        }
        traverseTo = traverseNode.edges.out[0];
      } while (traverseTo);

      const {
        id,
        data: { inputs, groups }
      } = currentNode;

      // this is left like this intentionally, much nicer to read this than if i would destruct it all
      const currentNodeType = inputs;
      const incommingNodeType = incommingNode.data.output;
      // AnForWhat.FLOWCONTROL
      if (!groups.includes(AnForWhat.FLOWCONTROL)) {
        if (!currentNodeType.includes(incommingNodeType)) {
          editor.removeSingleConnection(output_id, input_id, output_class, input_class);
          console.error('Got %s as output and %s as input', incommingNodeType, currentNodeType);
          notificationsStore.add(
            `Got ${incommingNodeType} as output and ${currentNodeType} as input`,
            'error'
          );
          return;
        }
      } else {
        // if we have the input of [] this means the node accepts N amount of inputs of the same type
        if (currentNodeType.length === 0) {
          // make sure the input is not already occupied
          let inputIndex = parseInt(input_class.split('_')[1], 10) - 1;
          if (!currentNode.edges.in[inputIndex]) {
            editor.addNodeInput(id);
          } else {
            editor.removeSingleConnection(output_id, input_id, output_class, input_class);
            console.error(
              'Input %s is already occupied by connection from %s',
              input_class,
              currentNode.edges.in[inputIndex]
            );
            notificationsStore.add(
              `Input ${input_class} is already occupied by connection from ${currentNode.edges.in[inputIndex]}`,
              'error'
            );
            return;
          }
        } else if (currentNodeType.length > 1) {
          console.debug('have flowcontrol op, check that all the inputs have the same type');
        } else {
          console.debug('FC operation else condition', currentNode);
        }
      }

      // Update the store
      workflowGraph.addEdge({
        fromNode: incommingNode,
        toNode: currentNode
      });

      workflow.generate();
    });
  });

  function allowDrop(ev: { preventDefault: () => void }) {
    ev.preventDefault();
    console.log('allowDrop invoked', ev);
  }

  function drag(ev: { preventDefault: () => void }) {
    console.log('drag invoked', ev);
  }

  function drop(ev: { preventDefault: () => void }) {
    console.log('drop invoked', ev);
  }
</script>

<svelte:window bind:innerHeight />

<div id="drawflow" class="flex flex-col h-screen" on:drag={drag} on:drop={drop} on:dragover={allowDrop} />
