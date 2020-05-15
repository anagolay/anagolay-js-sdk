import { stringToHex } from '@polkadot/util';
import { Rule } from '../../interfaces';
import { RuleInternalPayload } from './poe';

export function encode(data: string, algo = 'hex', prefix = '0x'): string {
  // raw means that multicodec in use is `raw bytes`
  // more info here https://github.com/multiformats/cid
  // and here https://github.com/multiformats/multicodec/blob/master/table.csv
  if (algo !== 'hex' || prefix !== '0x') {
    throw new Error('Currently we only support hex encoding');
  } else {
    return stringToHex(data);
  }
}

/**
 *
 * @param filePath String
 * @param writeMetadata Boolean
 */
export async function processRule(
  filePath: string,
  rulePayload: RuleInternalPayload,
  writeMetadata = false,
): Promise<{ payload: string; ruleId: string; proof: string }> {
  const { rule, ruleId } = rulePayload;
  const { buildParams, createProof } = rule;

  const fileBuffer = readFileSync(filePath);
  // here process the rule ops
  const tags = await exiftool.read(filePath, []);

  if (writeMetadata) {
    writeFileSync(
      './files/metadata/metadata-jpg.json',
      JSON.stringify(tags, null, 2),
    );

    writeFileSync(
      './files/metadata/metadata-jpg-raw.json',
      JSON.stringify(await exiftool.readRaw(filePath, []), null, 2),
    );
  }

  console.log(`\nProcessing image ...`);

  console.log(`\r Implementing rule ${ruleId}`);
  console.time('executeOps took');
  const ops = await executeOps(rule, fileBuffer, tags);
  console.timeEnd('executeOps took');

  console.time('buildBody took');
  const body = buildBody(rule, ops);
  console.timeEnd('buildBody took');

  console.time('buildPayload took');
  const payload = buildPayload(rule, ruleId, body);
  console.timeEnd('buildPayload took');

  console.time('buildPayload took');
  const payloadString = encode(
    objectToString(payload),
    buildParams.encodeAlgo,
    buildParams.prefix,
  );
  console.timeEnd('buildPayload took');

  console.log('\n');
  const params = {
    payload: payloadString,
    proof: encode(
      await createCID(
        await calculateHash(
          stringToU8a(payloadString),
          createProof.hashAlgo,
          createProof.hashBits,
        ),
      ).toString(),
    ),
    ruleId,
  };
  writeFileSync(
    `./files/poe-requests/${params.proof}.json`,
    JSON.stringify(
      {
        debug: { payload },
        params,
      },
      null,
      2,
    ),
  );
  return params;
}

/**
 * Example how to generate params
 * import { blake2AsHex } from '@polkadot/util-crypto';
 * blake2AsHex('abc'); // => 0xba80a53f981c4d0d
 *
 * @param proof hex encoded string Vec<u8> in rust.
 * Proof is the blake2b-128 hash of the PAYLOAD.
 * executed rules result produce the body of the payload,
 * then hex encoded using parity scale codec.
 * @param payload hex encoded string Vec<u8> in rust. Stringified object that
 * implements PoePayload interface.
 * @param rule string rule ID from the blockchain DB, or later a 'urn' format
 */
// function createClaim(proof: string, payload: string, ruleId: string): void {
//   console.log(proof, payload, ruleId);
//   return;
// }

// function createRule(proof: string, payload: string, ruleId: string): void {
//   console.log(proof, payload, ruleId);
//   return;
// }

/**
 * At the end we must get the calculated hashes
 * content_hash - hex encoded
 * metadata_hash - hex encoded
 * perceptual_hash - hex encoded ???
 *
 * @param {Rule} r
 */

async function executeOps(
  r: Rule,
  fileBuffer: Buffer,
  tags: Tags,
): Promise<string[]> {
  const { ops } = r;

  return Promise.all(
    ops.map(async ({ op, hashAlgo, hashBits, ops }) => {
      // eslint-disable-next-line prefer-const
      let ret = '',
        b,
        h,
        mh;
      switch (op) {
        case 'metadata_hash':
          b = stringToU8a(objectToString(cleanupMetadataTags(tags)));
          mh = await calculateHash(b, hashAlgo, hashBits);
          h = await createCID(mh).toString();
          if (ops?.length) {
            throw new Error(
              `ExecuteOps:: OP has more ops, we don't support that just yet.`,
            );
          }
          ret = h;
          break;
        case 'raw_pixels_hash':
          // here we should take the raw pixel hash only
          mh = await calculateHash(fileBuffer, hashAlgo, hashBits);
          h = await createCID(mh).toString();

          if (ops?.length) {
            throw new Error(
              `ExecuteOps:: OP has more ops, we don't support that just yet.`,
            );
          }
          ret = h;
          break;
        case 'perceptual_hash':
          const phash = await calculatePhash(fileBuffer);
          h = phash;
          if (ops?.length) {
            throw new Error(
              `ExecuteOps:: OP has more ops, we don't support that just yet.`,
            );
          }
          ret = h;
          break;
        case 'document_id':
          const { DocumentID } = tags;
          if (DocumentID) {
            h = DocumentID?.split(':')[1];
            if (ops?.length) {
              throw new Error(
                `ExecuteOps:: OP has more ops, we don't support that just yet.`,
              );
            }
            ret = h;
          }
          break;
        case 'original_document_id':
          const { OriginalDocumentID } = tags;
          if (OriginalDocumentID) {
            h = formatToUUID(OriginalDocumentID);
            if (ops?.length) {
              throw new Error(
                `ExecuteOps:: OP has more ops, we don't support that just yet.`,
              );
            }
            ret = h;
          }
          break;

        default:
          throw new Error('No default operation accepted.');
      }
      return ret;
    }),
  );
}

/**
 * Map the executed ops to the ops itself. could be good thing for refactor in the future
 * @param rule Rule
 * @param executedOps  string[]
 */

function buildBody(rule: Rule, executedOps: string[]): PoePayload['body'] {
  const { ops } = rule;
  // eslint-disable-next-line prefer-const
  let body: PoePayload['body'] = {};
  ops.forEach((op, i) => {
    return (body[op.op] = executedOps[i]);
  });
  return body;
}

function buildPayload(
  rule: Rule,
  ruleId: string,
  body: PoePayload['body'],
  prev = '',
): PoePayload {
  // eslint-disable-next-line prefer-const
  return {
    body,
    forWhat: rule.forWhat,
    ruleId: hexToString(ruleId),
    prev,
    creator: defaultCreator,
  };
}
