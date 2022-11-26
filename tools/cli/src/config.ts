import { defaultTo } from 'ramda';

// this cannot have the / at the end
export const websocketURL: string = 'wss://ws.anagolay.io';

// must end with the /, enable this when fixed
// export const workflowBuilderURL: string = 'https://app.anagolay.io/workflow-builder/';

// must end with the /
export const workflowBuilderURL: string =
  'https://bafybeiexksyj76zmsnsm6ew4eumidi75sigc2vchqqoeh2d3edxmorslxu.ipfs.anagolay.network/workflow-builder/';

export const publishServiceURL: string = defaultTo('https://builder.anagolay.io', process.env.AN_BUILDER_URL);
