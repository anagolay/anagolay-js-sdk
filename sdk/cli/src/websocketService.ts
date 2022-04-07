import clui from 'clui';
import { randomUUID } from 'crypto';
import { io, Socket } from 'socket.io-client';
// eslint-disable-next-line @typescript-eslint/typedef
const Spinner = clui.Spinner;

const { ANAGOLAY_WEBSOCKET_SERVICE_API_URL } = process.env;

export async function connectToWSAndListen(): Promise<any> {
  return new Promise((resolve, reject) => {
    const wsConnectionSpinner: clui.Spinner = new Spinner('Connecting WS service ...');
    wsConnectionSpinner.start();

    const namespace: string = `workflow-${randomUUID()}`;
    // const namespace: string = `workflow`;
    const socket: Socket = io(`${ANAGOLAY_WEBSOCKET_SERVICE_API_URL}/${namespace}`, {
      path: '/ws',
      reconnection: true,
    });

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
      socket.io.opts.transports = ['polling', 'websocket'];
      wsConnectionSpinner.stop();
    });

    socket.on('disconnect', (d) => {
      wsConnectionSpinner.stop();
      console.log(`Disconnected from WebSockets`, d);
    });

    /**
     * This is the main event for the continuing the workflow creation
     */
    socket.on('continueWithWorkflow', (message) => {
      wsConnectionSpinner.stop();
      resolve(message);
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
