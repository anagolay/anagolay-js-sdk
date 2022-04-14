import { writable, type Updater, type Writable } from 'svelte/store';
import type { NodeToAdd, WorkflowNodeConnection } from './interfaces';

export const allNodes: Writable<NodeToAdd[]> = writable([]);

function workflowNodesFn() {
  const { update, subscribe, set } = writable<WorkflowNodeConnection[]>([]);

  return {
    subscribe: subscribe,
    set: set,
    /**
     * Add the node
     * @param n - Node to add to the store
     * @returns
     */
    add: (n: NodeToAdd) => {
      const r = {
        id: n.id,
        connections: {
          out: [],
          in: [],
        },
      };
      update((currentState) => [...currentState, r]);
    },
    addConnection: ({ fromNode, toNode }) => {
      // console.log(fromNode, toNode);
    },
    reset: () => set([]),
  };
}

export const workflowNodes = workflowNodesFn();
// export const workflowNodes = writable<WorkflowNodesConnection>({});
