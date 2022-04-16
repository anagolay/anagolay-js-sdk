import { writable, type Updater, type Writable } from 'svelte/store';
import type { NodeToAdd, WorkflowNodeConnection } from './interfaces';

export const addedNodes: Writable<string[]> = writable([]);

export const allNodes: Writable<NodeToAdd[]> = writable([]);

function workflowFn() {
  const { update, subscribe, set } = writable<WorkflowNodeConnection[]>([]);

  return {
    subscribe: subscribe,
    set: set,
    /**
     * Add the node
     * @param n - Node to add to the store
     * @returns
     */
    addNode: (n: NodeToAdd) => {
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
    setConfig: (data: { nodeId: string; configKey: string; configValue: string }) => {
      console.log(data);
    },
    reset: () => set([]),
  };
}

export const workflow = workflowFn();
// export const workflowNodes = writable<WorkflowNodesConnection>({});
