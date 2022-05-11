/* eslint-disable @rushstack/typedef-var */
import clui from 'clui';
import { io, Socket, SocketOptions } from 'socket.io-client';
const Spinner = clui.Spinner;

const { ANAGOLAY_WEBSOCKET_SERVICE_API_URL } = process.env;

import { AnOperation, AnOperationVersion, AnWorkflowData } from '@anagolay/types';
import { serializeThenParse } from '@anagolay/utils';

export interface IWorkflowBuild {
  manifestData: AnWorkflowData;
  operations: AnOperation[];
  operationVersions: AnOperationVersion[];
}

/**
 * Connect to the Socket.io instance
 * @param url  - Full URL with or without the namespace
 * @param options - Normal Socket options
 * @returns Connected socket

 */
export function connectToWs(url: string, options?: SocketOptions): Socket {
  const socket: Socket = io(url, {
    path: '/ws',
    reconnection: true,
    transports: ['websocket'],
    secure: false,
    ...options,
  });
  return socket;
}

/**
 * Connect to the Socket and listen for the events for Workflow namespaces.
 * @param namespace - workflow namespace in a format `workflow-uuidV4`
 * @param options - optional socket options
 *
 *
 * @returns Resolves the message with the signature {@link WorkflowData} interface
 */
export async function connectToWSAndListenFowWorkflow(
  namespace: string,
  options?: SocketOptions
): Promise<IWorkflowBuild> {
  return new Promise((resolve, reject) => {
    const wsConnectionSpinner: clui.Spinner = new Spinner('Connecting WS service ...');
    wsConnectionSpinner.start();

    const socket: Socket = connectToWs(`${ANAGOLAY_WEBSOCKET_SERVICE_API_URL}/${namespace}`, options);

    socket.on('connect', () => {
      wsConnectionSpinner.message('Waiting for the data ...');

      // const transport: string = socket.io.engine.transport.name; // in most cases, "polling"
      // console.log(`Current transport is ${transport}`);
      // socket.io.engine.on('upgrade', () => {
      //   const upgradedTransport: string = socket.io.engine.transport.name; // in most cases, "websocket"
      //   console.log(`Upgraded transport is ${upgradedTransport}`);
      // });
    });

    socket.on('connect_error', (data) => {
      console.log('Error in connecting to the WS', data);
      wsConnectionSpinner.stop();
      socket.disconnect();
    });
    socket.on('error', (data) => {
      console.log('got ERROR', data);
      wsConnectionSpinner.stop();
      socket.disconnect();
    });

    socket.on('disconnect', (d) => {
      wsConnectionSpinner.stop();
      console.log(`Disconnected from WebSockets`, d);
    });

    /**
     * This is the main event for the continuing the workflow creation
     */
    socket.on('continueWithWorkflow', (message: IWorkflowBuild) => {
      wsConnectionSpinner.stop();
      socket.disconnect();

      // this is really needed to do here since we are serializing the Map into the object with the `type='Map'` and now we need the actual Map
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const m: IWorkflowBuild = serializeThenParse<any>(message, true);

      resolve(m);
    });

    /**
     * When user cancels the Workflow building
     */
    socket.on('cancelWorkflowBuilding', (message) => {
      console.log('Cancel workflow building', message);
      wsConnectionSpinner.stop();
      reject('Workflow building canceled');
    });
  });
}
