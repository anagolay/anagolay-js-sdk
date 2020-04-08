import { stringToU8a, u8aToHex, stringToHex } from '@polkadot/util';
import { blake2AsHex } from '@polkadot/util-crypto';
import { exiftool } from 'exiftool-vendored';
import { readFileSync, writeFileSync } from 'fs';
import * as msgpack from 'msgpack';
import { ForWhat, PoePayload, Rule } from '../../interfaces/poe/definitions';
import * as mh from 'multihashing-async';
import * as CID from 'cids';
import { calculatePhash } from './helpers';

/**
 * Example how to generate params
 * import { blake2AsHex } from '@polkadot/util-crypto';
 * blake2AsHex('abc'); // => 0xba80a53f981c4d0d
 *
 * @param proof hex encoded string Vec<u8> in rust.
 * Proof is the blake2-256 hash of the PAYLOAD.
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
 *
 * @param filePath String
 * @param writeMetadata Boolean
 */
export async function processImageForPoE(filePath: string, writeMetadata = false): Promise<void> {
  const fileBuffer = readFileSync(filePath);

  // here process the rule ops
  const tags = await exiftool.read(filePath, []);
  const { DocumentID, OriginalDocumentID } = tags;

  if (writeMetadata) {
    writeFileSync('./files/metadata-files/metadata-jpg.json', JSON.stringify(tags, null, 2));

    writeFileSync(
      './files/metadata-files/metadata-jpg-raw.json',
      JSON.stringify(await exiftool.readRaw(filePath, []), null, 2),
    );
  }

  const phash = await calculatePhash(fileBuffer);
  const ruleId = u8aToHex(stringToU8a('urn:cid:the-CID-hash-of-the-rule-set'));
  const payloadRaw: PoePayload = {
    body: {
      metadataHash: blake2AsHex(stringToU8a(msgpack.pack(tags))),
      rawPixelsHash: blake2AsHex(fileBuffer),
      perceptualHash: u8aToHex(stringToU8a(phash)),
      documentId: u8aToHex(stringToU8a(DocumentID.split(':')[1])),
      originalDocumentId: u8aToHex(stringToU8a(OriginalDocumentID)),
    },
    forWhat: ForWhat.Photo,
    prev: null,
    ruleId,
  };

  const packed = msgpack.pack(payloadRaw);
  const t = stringToU8a(packed);
  const proof = blake2AsHex(t);
  const payload = u8aToHex(t);

  writeFileSync(
    `./files/poe-requests/${proof}.json`,
    JSON.stringify(
      {
        debug: { payloadRaw: payload },
        params: { payload, proof, ruleId },
      },
      null,
      2,
    ),
  );
}

/**
 * At the end we must get the calculated hashes
 * content_hash - hex encoded
 * metadata_hash - hex encoded
 * perceptual_hash - hex encoded ???
 *
 * @param {Rule} r
 */

function executeRules(r: Rule): string[] {
  const { ops } = r;
  ops.forEach((op) => {
    return op;
  });

  return [];
}

export async function createRulePayload(rule: Rule): Promise<{ ruleId: string; payload: string }> {
  const buf = Buffer.from(JSON.stringify(rule));
  // const buf = stringToU8a();

  const hash = await mh(buf, 'blake2b-256');
  const cid = new CID(1, 'raw', hash);
  const payload = u8aToHex(buf);
  return { ruleId: stringToHex(cid.toString()), payload };
}
