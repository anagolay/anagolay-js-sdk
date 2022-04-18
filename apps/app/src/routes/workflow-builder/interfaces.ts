import type { AnCharacters, AnOperationData } from '@anagolay/types';

/**
 * Drawflow node
 *
 * ```
 * data[0] - name Name of module
 * data[1] - inputs Number of inputs
 * data[2] - outputs Number of outputs
 * data[3] - posx Position on start node left
 * data[4] - posy Position on start node top
 * data[5] - className Added classname to the node
 * data[6] - data Data passed to node
 * data[7] - html HTML drawn on node or name of register node.
 * data[8] - typenode Default false, true for Object HTML, vue for vue
 * ```
 */
export interface NodeToAdd {
  id: string;
  data: [string, number, number, number, number, string, any, string, string | boolean];
}

export interface Connection {
  nodeId: string;
  nameOrIndex?: string;
}
export interface WorkflowNodeConnection {
  /**
   * Latest Version id
   */
  id: string;
  config: Map<AnCharacters, AnCharacters[]>;
  /**
   * An edge is a connection between two nodes. All edges are directed
   */
  edges: {
    /**
     * All the nodes FROM this node.
     */
    out: string[];
    /**
     * All the nodes TO this node.
     */
    in: string[];
  };
  /**
   * Operation Data type
   */
  data: AnOperationData;
}

export interface DrawflowNode {
  class: string;
  data: any;
  html: string;
  id: string;
  inputs: Record<string, DrawflowConnection>;
  name: string;
  outputs: Record<string, DrawflowConnection>;
  pos_x: number;
  pos_y: number;
  typenode: boolean;
}

export interface DrawflowConnection {
  connections: DrawflowConnectionDetail[];
}

export interface DrawflowConnectionDetail {
  input: string;
  node: string;
}

export interface Segment {
  input: number[];
  sequence: SegmentData[];
}

export interface SegmentData {
  node: WorkflowNodeConnection;
  representation: [string, any];
}

export interface Sequence {
  version_id: string;
  config: Record<string, any>;
}
