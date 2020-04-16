import CID from 'cids';
import { Tags } from 'exiftool-vendored';
import { writeFileSync } from 'fs';
import * as imghash from 'imghash';
import leven from 'leven';
import msgpack from 'msgpack';
import mh from 'multihashing-async';

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectToString(o: Record<string, any>): string {
  const r = JSON.stringify(o);
  // console.log(`\nLength of the json string is ${Buffer.byteLength(r)} bytes`);
  return r;
}

export function objectToStringMsgPack(o: Record<string, any>): string {
  const r = msgpack.pack(o);
  console.log(`\nLength of the json string is ${Buffer.byteLength(r)} bytes`);
  return r;
}

export function customTypesToJSON(types) {
  return writeFileSync('./files/customTypes.json', JSON.stringify(types, null, 2));
}

/**
 * Original Document ID sometimes is a UUID without hyphens, this makes it look nice
 * later maybe add the is-uuid check https://runkit.com/woss/is-uuid-guid
 * @param str string
 */
export function formatToUUID(uuid: string): string {
  // return the parse one, no check here
  if (uuid.split('-').length === 5) {
    return uuid;
  }

  const r = new RegExp(/([A-Za-z0-9]{8})([A-Za-z0-9]{4})([A-Za-z0-9]{4})([A-Za-z0-9]{4})([A-Za-z0-9]{12})/gi);

  const matches = r.exec(uuid) as RegExpExecArray;
  if (matches.length !== 6) {
    throw new Error('Invalid UUID');
  }

  const ret = matches.slice(1, matches.length).join('-').toLowerCase();

  return ret;
}

function calculateSimilarity(buf1: Buffer, buf2: Buffer): string {
  const hash1 = imghash.hash('./img1');
  const hash2 = imghash.hash('./img2');

  Promise.all([hash1, hash2]).then((results) => {
    const dist = leven(results[0], results[1]);
    console.log(`Distance between images is: ${dist}`);
    if (dist <= 12) {
      console.log('Images are similar');
    } else {
      console.log('Images are NOT similar');
    }
  });

  return '';
}

export async function calculateHash(data: Uint8Array, algo = 'blake2b', length = 256): Promise<Buffer> {
  const hash = await mh(data, `${algo}-${length}`);
  return hash;
}

export function createCID(data: Buffer, codec = 'raw'): CID {
  return new CID(1, codec, data);
}

/**
 * Use only binary ascii representation
 * @param b Buffer
 */
export async function calculatePhash(b: Buffer): Promise<string> {
  return await imghash.hash(b, 8, 'binary');
}

export function cleanupMetadataTags(tags: Tags): Tags {
  return tags;
}
