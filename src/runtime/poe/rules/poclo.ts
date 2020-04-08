export const poloCameraOperations = {
  version: 1,
  verificationHash: 'CID hash',
  verificationHashRule: {
    include: '*',
    exclude: ['verificationHash', 'verificationHashRule'],
    hashAlgo: 'multihash',
    encode: 'cidv1',
    format: 'string', // by default
  },
  createdAt: 'human readable time, always UTC',
  creatorNodeId: 'node ID that generated the rule', // this comes later, ignore for now
  forType: 'camera',
  '@challenge':
    'bafybiqgytenkwgbfeddsg4xaor3od65p5x5saynp3jp2flspadi3uumwtwgjcdppclnwhhacnsucng2leoqy6x6jyt4q4jpdn7gfa4ads3smi',
  attempt: 1,
  ttl: 25200, // seconds 7h
  ops: [
    {
      op: 'create',
      what: 'qrcode',
      fromPayload: '@challenge',
      output: false, // this means that this action does not have an output value
    },
    {
      op: 'take_photo',
      what: 'jpeg',
      unmodified: true,
      original: true,
      croppingAllowed: false,
      description: 'Modifications are NOT allowed!',
      output: false,
      userop: true,
    },
    {
      op: 'upload',
      output: true,
      userop: true,
      format: 'buffer',
    },
    {
      op: 'read_qrcode',
      output: true,
      format: 'buffer',
    },
    {
      accepts: ['buffer'],
      op: 'verify',
      what: 'payload',
      with: '@challenge',
      operator: 'equal',
      format: 'boolean',
    },
    {
      op: 'read_metadata',
      output: true, // this means that this action has an output value and it must be passed into the next action
      format: 'buffer',
    },
    {
      accepts: ['buffer'],
      op: 'encode',
      algo: 'base64',
      output: true, // this means that this action has an output value and it must be passed into the next action
      format: 'buffer',
    },
    {
      accepts: ['buffer'],
      op: 'create',
      what: 'string',
      local: true,
      alias: '@payload',
      output: true, // this means that this action has an output value and it must be passed into the next action OR just return the value if it's last action
    },
    {
      op: 'sign',
      what: '@payload',
      userop: true,
      output: true, // this means that this action has an output value and it must be passed into the next action OR just return the value if it's last action
      format: 'buffer',
    },
    {
      accepts: ['buffer'],
      op: 'create',
      what: 'string',
      local: true,
      alias: '@signedPayload',
      output: true, // this means that this action has an output value and it must be passed into the next action OR just return the value if it's last action
      format: 'string',
    },
    {
      accepts: ['string'],
      op: 'api',
      transport: {
        type: 'rpc',
        uri: 'self',
      },
      methodName: 'claim',
      params: [
        {
          key: 'payload',
          value: '@signedPayload',
        },
      ],
    },
  ],
  nextStep: {
    module: 'poc',
    method: 'getRulesForPhoto',
    params: [
      {
        arg: 'photoID', // this is the method argument, getRulesForPhoto(photoID: VALUE)
        value: 'string',
      },
    ],
  },
};
