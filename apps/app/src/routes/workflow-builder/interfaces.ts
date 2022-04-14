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
  name: string;
}
export interface WorkflowNodeConnection {
  id: string;
  connections: {
    out: Connection[];
    in: Connection[];
  };
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

export declare type Segment = {
  input: number[];
  sequence: SegmentData[];
};

export declare type SegmentData = {
  node: DrawflowNode;
  representation: [string, any];
};
