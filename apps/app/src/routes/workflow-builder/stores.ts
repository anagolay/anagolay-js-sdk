import { clone } from 'remeda';
import { writable, type Subscriber, type Writable, get, type Unsubscriber } from 'svelte/store';
import type { NodeToAdd, WorkflowNodeConnection } from './interfaces';
import type { AnWorkflowData } from '@anagolay/types';

export const addedNodes: Writable<string[]> = writable([]);

export const workflowNodes: Writable<NodeToAdd[]> = writable([]);

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
        config: {},
      };
      update((currentState) => [...currentState, r]);
    },
    addConnection: ({ fromNode, toNode }) => {
      // console.log(fromNode, toNode);
    },
    /**
     * Set the Operation Config
     * @param config - Config with NodeId
     * @remarks  It's using the `update` and sets new state
     */
    setConfig: (config: { nodeId: string; configKey: string; configValue: string }) => {
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
export const workflow = workflowFn();

/**
 * Workflow Manifest
 * @param initialData - Initial data
 * @returns
 */
function workflowManifestFn(initialData: AnWorkflowData) {
  const { update, subscribe, set } = writable<AnWorkflowData>();
  set(initialData);
  console.log('get workflow', get(workflow), initialData);
  return {
    subscribe,
    set,
    createWorkflow: () => {},
  };
}

/**
 * Workflow Manifest store
 */
export const workflowManifest = workflowManifestFn({
  name: '',
  description: '',
  creator: '',
  groups: [],
  segments: [],
});
