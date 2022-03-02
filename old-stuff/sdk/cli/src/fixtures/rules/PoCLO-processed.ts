/**
 * Rule specification
 */

import { AnRule } from '@anagolay/types';

export const rule: AnRule = {
  id: 'bafy2bzacedwhjyp6unu4p2ife2n5f6db4hd4jp7jr7qpati5tdgysifnlgg3w',
  data: {
    creator: 'did:substrate:5HnKtosumdYfHSifYKBHhNmoXvhDANCU8j8v7tc4p4pY7MMP/sensio-network',
    desc: 'Proof of Camera and Lens Ownership. Implementing this rule we can say with certainty that user owns the mentioned equipment',
    groups: [2, 3],
    name: 'Anagolay PoCLO rule',
    parentId: '',
    version: 1,
    ops: [
      {
        id: 'bafy2bzacealjmcwnfurdmn2tndsv35d5cdbaempopwdq5pr5zr56yrfhuc2zk',
        children: [
          {
            id: 'bafy2bzacecmqyut2oozadzigqsggrhkqxd2fxovubcy4djibfyci6iq6t4s4u',
            children: [
              {
                id: 'bafy2bzacecc2mmjx3nltb7pkdbtvjf64pjoswimxrcowguwi5jxn34blzb44s',
                children: [
                  {
                    id: 'bafy2bzacebtqlbme62wogt4a7447lxsebvu5fncnht3eedmyvjle7t32ue46c',
                    children: [
                      {
                        id: 'bafy2bzacebr4fj6rnexne25v6zcuomsfnbfxrv22cwzrrqexeo3ggotd3u3zu',
                        children: [
                          {
                            id: 'bafy2bzacecxvve6bdbjvokspk2ocvk6m2yvrykcguzluf6q2criwnwzz4hnnw',
                            children: [
                              {
                                id: 'bafy2bzacebvd3b7upai2av3w33dwrwqkh7w7qvbon6obi6q4evw6pqe744npu',
                                children: [],
                              },
                              {
                                id: 'bafy2bzacecc2mmjx3nltb7pkdbtvjf64pjoswimxrcowguwi5jxn34blzb44s',
                                children: [
                                  {
                                    id: 'bafy2bzacedtcdvuykc4jencdnm5zymadzutm7yzvpughbgjotxmgpyglzhqpc',
                                    children: [
                                      {
                                        id: 'bafy2bzacecnosczzvuuibkajhvporgd4e5rrye4wcorvm7zmloinm6ofngdeq',
                                        children: [
                                          {
                                            id: 'bafy2bzacebvd3b7upai2av3w33dwrwqkh7w7qvbon6obi6q4evw6pqe744npu',
                                            children: [],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default rule;
