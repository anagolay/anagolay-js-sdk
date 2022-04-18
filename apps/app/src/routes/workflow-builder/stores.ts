import { type AnWorkflowData, type AnWorkflowSegment, AnForWhat } from '@anagolay/types';
import * as R from 'ramda';
import { clone, filter, forEach, isNil, last } from 'remeda';
import { type Writable, get, writable } from 'svelte/store';

import type { OperationsFixture } from '$src/fixtures/operations';
import { removeItemFromArray } from '$src/utils/utils';

import type { Segment, SegmentData, WorkflowNodeConnection } from './interfaces';

/**
 * Keep the `NodeId[]` as a quick cache access
 */
export const addedNodesIds: Writable<string[]> = writable([]);

function workflowGraphFn() {
  const { update, subscribe, set } = writable<WorkflowNodeConnection[]>([]);

  return {
    subscribe,
    set,
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
        config: new Map(),
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

      update((currentState) => {
        fromNode.edges.out.push(toNode.id);
        toNode.edges.in.push(fromNode.id);
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
        const currentConfig = node.config;
        // update the config
        currentConfig[configKey] = configValue;

        node.config = new Map(Object.entries(currentConfig));

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

  // this is called only once when the store is created
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
      segments.push({
        input: [],
        sequence: [...currentSegment].reverse(),
      });

      // clear out currentSegment, assinging the [] doesn't work.
      currentSegment.length = 0;
    }
    return segments;
  }

  /**
   * Simple and dirty recursive function which traversed the manifest graph.
   *
   * @TODO
   *
   * @remarks we need to improve this for sure.
   *
   * @param currentNode
   * @param currentSegment
   * @param segments
   * @param traversed
   */
  function traverseGraph(
    currentNode: WorkflowNodeConnection,
    currentSegment: SegmentData[],
    segments: Segment[],
    traversed: string[] = []
  ) {
    const incomingConnections = currentNode.edges.in;
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

      // helper array which contains the names and ids
      let segments: Segment[] = [];

      // current processing segment
      const currentSegment: SegmentData[] = [];

      /**
       * `root`s have dual definition:
       *
       * 1. any node without edges is a ``root``
       * 2. the most dependent node is a ``root``
       *
       * This doesn't mean that the root is the root of the execution, it means that this is workflow root, or a center
       */
      const roots = filter(workflowGraphStore, (f) => f.edges.out.length === 0);
      forEach(roots, (node) => {
        traverseGraph(node, currentSegment, segments);
        if (currentSegment.length > 0) {
          createNewSegment(currentSegment, segments);
        }
      });

      // need to reverse because the processing will always put the last segments in the first place.
      segments = segments.reverse();

      // loop through the segments to update correct inputs with correct segment Indexes
      segments.forEach((segment) => {
        const firstOpData = segment.sequence[0];

        // fill the array with the -1 for length of the input edges. -1 means that this is the user input segment.
        segment.input = Array(firstOpData.node.edges.in.length || 1).fill(-1);

        // cache the node ids per segment for faster querying later
        const nodeIdsBySegment = segments.map((segment) => segment.sequence.flatMap((data) => data.node.id));

        forEach(firstOpData.node.edges.in, (f) => {
          // find the segment index that matches the incoming edge node from the cache array
          const segmentIndex = nodeIdsBySegment.findIndex((ids) => ids.find((id) => id === f));
          if (segmentIndex >= 0) {
            // now find the input inde
            const inputIndex = segments.findIndex((seg) => seg.sequence.find((seg1) => seg1.node.id === f));

            segment.input[inputIndex] = segmentIndex;
          }
        });
      });
      const s: AnWorkflowSegment[] = segments.map((segment) => {
        console.log(segment);
        return {
          input: segment.input,
          sequence: segment.sequence.map((d: SegmentData) => ({
            version_id: d.node.id,
            config: d.node.config,
          })),
        };
      });

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
