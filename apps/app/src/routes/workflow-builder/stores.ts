import { clone, compact, filter, forEach, isNil, last, map } from 'remeda';
import { writable, type Subscriber, type Writable, get } from 'svelte/store';
import type { NodeToAdd, Segment, SegmentData, WorkflowNodeConnection } from './interfaces';
import { AnForWhat, type AnWorkflowData, type AnWorkflowSegment } from '@anagolay/types';
import type { OperationsFixture } from '$src/fixtures/operations';
import { removeItemFromArray } from '$src/utils/utils';
import * as R from 'ramda';
/**
 * Keep the `NodeId[]` as a quick cache access
 */
export const addedNodesIds: Writable<string[]> = writable([]);

function workflowGraphFn() {
  const { update, subscribe, set } = writable<WorkflowNodeConnection[]>([]);

  return {
    subscribe: subscribe,
    set: set,
    /**
     * Get the node by the ID,
     * @remarks Remember, the nodeID is the `last(versions)`
     * @param nodeId
     * @returns
     */
    getNodeById: (nodeId: string): WorkflowNodeConnection => {
      const currentState = get(workflowGraph);
      return currentState.find((v) => v.id === nodeId);
    },
    /**
     * Add the node
     * @param n - Node to add to the store
     * @returns Nothing
     */
    addNode: (n: OperationsFixture) => {
      const node: WorkflowNodeConnection = {
        id: last(n.versions),
        data: n.data,
        edges: {
          out: [],
          in: [],
        },
        config: {},
      };
      update((currentState) => {
        const nodeIsAlreadyAdded = currentState.find((v) => v.id === node.id);
        if (isNil(nodeIsAlreadyAdded)) {
          // add the node to cache
          addedNodesIds.update((currentState) => [...currentState, node.id]);
          return [...currentState, node];
        } else {
          console.debug('node is already added');
          return currentState;
        }
      });
    },
    removeNode: (nodeId: string) => {
      const cachedStore = get(addedNodesIds);
      addedNodesIds.set(removeItemFromArray(cachedStore, nodeId));

      update((currentState) => {
        const nodeIdx = currentState.findIndex((f) => f.id === nodeId);
        return R.remove(nodeIdx, 1, currentState);
      });
    },
    /**
     * Add edge ( a connection ) from NodeA to NodeB. WE are dealing with `directed` edges, and that means that
     * @param edge
     */
    addEdge: (edge: { fromNode: WorkflowNodeConnection; toNode: WorkflowNodeConnection }) => {
      const { fromNode, toNode } = edge;
      console.log('Make connection from %s output to %s input ', fromNode.data.name, toNode.data.name);

      update((currentState) => {
        fromNode.edges.out.push(toNode.id);
        toNode.edges.in.push(fromNode.id);
        console.log('currentState', currentState);
        return currentState;
      });
    },
    /**
     * Set the Operation Config
     * @param config - Config with NodeId
     * @remarks  It's using the `update` and sets new state
     */
    setConfigToNode: (config: { nodeId: string; configKey: string; configValue: string }) => {
      const { nodeId, configKey, configValue } = config;

      update((currentState) => {
        const nodeIdx = currentState.findIndex((f) => f.id === nodeId);
        const node = currentState.find((f) => f.id === nodeId);

        node.config[configKey] = configValue;

        // deep clone the current state
        const newState = clone(currentState);

        // update the index
        newState[nodeIdx] = node;

        // return new state
        return newState;
      });
    },
    reset: () => set([]),
  };
}
export const workflowGraph = workflowGraphFn();

/**
 * Workflow Manifest
 * @param initialData - Initial data
 * @returns
 */
function workflowManifestFn(initialData: AnWorkflowData) {
  const { update, subscribe, set } = writable<AnWorkflowData>();
  set(initialData);

  /**
   * Create a new segment.
   *
   * @privateRemark - This must be done in better way.
   *
   * @param currentSegment
   * @param incomingSegments
   */
  function createNewSegment(currentSegment: SegmentData[], incomingSegments: Segment[]) {
    const segments = incomingSegments;

    if (currentSegment.length > 0) {
      const pushedIndex = segments.push({
        input: [],
        sequence: [...currentSegment].reverse(),
      });

      // clear out currentSegment, there must be better solution
      currentSegment.splice(0, currentSegment.length);
    }
    return segments;
  }

  function traverseGraph(
    currentNode: WorkflowNodeConnection,
    currentSegment: SegmentData[],
    segments: Segment[],
    traversed: string[] = []
  ) {
    // get all incoming connections
    // outgoers
    const incomingConnections = currentNode.edges.in;

    // While using drawflow we can always know the name of the output. Also we cannot have more than one output, so it will always be `output_1`
    const outgoingConnections = currentNode.edges.out;

    const isTraversed = traversed.includes(currentNode.id);

    if (!isTraversed) {
      traversed.push(currentNode.id);
      if (outgoingConnections.length > 1) {
        createNewSegment(currentSegment, segments);
      }
      currentSegment.push({
        node: currentNode,
        representation: [currentNode.data.name, {}],
      });

      if (
        incomingConnections.length === 0 ||
        incomingConnections.length > 1 ||
        currentNode.data.groups.includes(AnForWhat.USER)
      ) {
        createNewSegment(currentSegment, segments);
        incomingConnections.map((inputConnection) => {
          const r = workflowGraph.getNodeById(inputConnection);
          traverseGraph(r, currentSegment, segments);
        });
      } else if (incomingConnections.length === 1) {
        const currentNode = workflowGraph.getNodeById(incomingConnections[0]);

        traverseGraph(currentNode, currentSegment, segments, traversed);
      }
    }
  }

  return {
    subscribe,
    set,
    /**
     * Generate the manifest based on the `workflowGraph` store
     */
    generate: () => {
      const workflowGraphStore = get(workflowGraph);
      console.log('workflowGraphStore', workflowGraphStore);

      let segments: Segment[] = [];
      let currentSegment: SegmentData[] = [];

      const roots = filter(workflowGraphStore, (f) => f.edges.out.length === 0);
      forEach(roots, (node) => {
        traverseGraph(node, currentSegment, segments);
        if (currentSegment.length > 0) {
          const incomingConnections = node.edges.in.reverse();
          createNewSegment(currentSegment, segments);
        }
      });
      segments = segments.reverse();
      segments.forEach((segment) => {
        const firstOpData = segment.sequence[0];
        // in drawflow the inputs are Record<string,any>, need the length, so only way is to get the keys then length of them
        segment.input = Array(Math.max(1, firstOpData.node.edges.in.length)).fill(-1);

        const nodeIdsBySegment = segments.map((segment) => segment.sequence.flatMap((data) => data.node.id));

        console.log('nodeIdsBySegment', nodeIdsBySegment);

        forEach(firstOpData.node.edges.in, (f) => {
          let segmentIndex = nodeIdsBySegment.findIndex((ids) => ids.find((id) => id === f));
          console.log('segmentIndex', segmentIndex);
          if (segmentIndex >= 0) {
            const inputIndex = segments.findIndex((seg) => seg.sequence.find((seg1) => seg1.node.id === f));

            segment.input[inputIndex] = segmentIndex;
          }
        });
      });
      const s: AnWorkflowSegment[] = segments.map((segment) => {
        return {
          input: segment.input,
          sequence: segment.sequence.map((d: SegmentData) => ({
            version_id: d.node.id,
            config: d.node.config,
          })),
        };
      });
      console.log({ segments, s });
      update((currentState) => {
        return { ...currentState, segments: s };
      });
    },
  };
}

/**
 * Workflow Manifest store. The `generate` must be called, it is not automatically triggered
 */
export const workflowManifest = workflowManifestFn({
  name: '',
  description: '',
  creator: '',
  groups: [],
  segments: [],
});
