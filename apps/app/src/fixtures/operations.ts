import { nanoid } from 'nanoid';
import { CID } from 'multiformats/cid';
import { base32 } from 'multiformats/bases/base32';
import * as raw from 'multiformats/codecs/raw';
import { sha256 } from 'multiformats/hashes/sha2';
import { AnForWhat, type AnOperationData } from '@anagolay/types';

async function createCid(data: string) {
  const encodedData = new TextEncoder().encode(data);
  return CID.create(1, raw.code, await sha256.digest(encodedData)).toString(base32);
}
export interface OperationsFixture {
  id: string;
  data: AnOperationData;
  versions: string[];
}
export async function makeOps(): Promise<OperationsFixture[]> {
  const ops: OperationsFixture[] = [
    {
      id: await createCid('op_multihash'),
      data: {
        name: 'op_multihash',
        description: 'Generic multihash operation.',
        inputs: ['Bytes'],
        config: new Map().set('hasher', ['Blake3_256', 'Sha2_256']),
        groups: [AnForWhat.SYS],
        output: 'U64MultihashWrapper',
        repository: 'https://gitlab.com/anagolay/op-multihash',
        license: 'Apache 2.0',
        nostd: false,
      },
      versions: [
        await createCid(nanoid()),
        await createCid(nanoid()),
        await createCid(nanoid()),
        await createCid(nanoid()),
      ],
    },
    {
      id: await createCid('op_file'),
      data: {
        name: 'op_file',
        description:
          'Reads the file from given url and returns the buffer. RAW file buffer for other ops to use.',
        inputs: ['String'],
        config: new Map(),
        groups: [AnForWhat.SYS],
        output: 'Bytes',
        repository: 'https://gitlab.com/anagolay/op-file',
        license: 'Apache 2.0',
        nostd: true,
      },
      versions: [
        await createCid(nanoid()),
        await createCid(nanoid()),
        await createCid(nanoid()),
        await createCid(nanoid()),
      ],
    },
    {
      id: await createCid('op_cid'),
      data: {
        name: 'op_cid',
        description: 'Anagolay CID operation. Generates the V1 of the CID',
        inputs: ['U64MultihashWrapper'],
        config: new Map(),
        groups: [AnForWhat.SYS],
        output: 'String',
        repository: 'https://gitlab.com/anagolay/op-cid',
        license: 'Apache 2.0',
        nostd: true,
      },
      versions: [
        await createCid(nanoid()),
        await createCid(nanoid()),
        await createCid(nanoid()),
        await createCid(nanoid()),
      ],
    },
    {
      id: await createCid('op_match_all'),
      data: {
        name: 'match_all',
        description:
          'This operation must have children ops. **ALL** the outputs of children ops must be the same in order to proceed.',
        inputs: [],
        config: new Map(),
        groups: [AnForWhat.SYS, AnForWhat.FLOWCONTROL],
        output: 'Boolean',
        repository: 'https://gitlab.com/anagolay/op-cid',
        license: 'Apache 2.0',
        nostd: true,
      },
      versions: [
        await createCid(nanoid()),
        await createCid(nanoid()),
        await createCid(nanoid()),
        await createCid(nanoid()),
      ],
    },
  ];
  return ops;
}
