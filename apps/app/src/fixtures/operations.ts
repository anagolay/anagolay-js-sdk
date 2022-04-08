import { nanoid } from 'nanoid';
import { CID } from 'multiformats/cid';
import { base32 } from 'multiformats/bases/base32';
import * as raw from 'multiformats/codecs/raw';
import { sha256 } from 'multiformats/hashes/sha2';

async function createCid(data: string) {
  const encodedData = new TextEncoder().encode(data);
  return CID.create(1, raw.code, await sha256.digest(encodedData)).toString(base32);
}
export interface OperationsFixture {
  id: string;
  data: {
    name: string;
    description: string;
    input: string[];
    config: {
      hasher?: string[];
    };
    groups: string[];
    output: string;
    repository: string;
    license: string;
    nostd: boolean;
  };
  versions: string[];
}
export async function makeOps(): Promise<OperationsFixture[]> {
  const ops = [
    {
      id: await createCid('op_multihash'),
      data: {
        name: 'op_multihash',
        description: 'Generic multihash operation.',
        input: ['Bytes'],
        config: {
          hasher: ['Blake3_256', 'Sha2_256'],
        },
        groups: ['SYS'],
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
        input: ['String'],
        config: {},
        groups: ['SYS'],
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
        input: ['U64MultihashWrapper'],
        config: {},
        groups: ['SYS'],
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
  ];
  return ops;
}
