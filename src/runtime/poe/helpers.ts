import { Tags } from 'exiftool-vendored';
import * as imghash from 'imghash';
import leven from 'leven';
export function consoleLogImportantTags(b: Tags, all = false): void {
  // console.log('DerivedFrom', b.DerivedFrom);
  if (all) {
    console.log(b);
  }
}

/**
 * Use only binary ascii representation
 * @param b
 */
export async function calculatePhash(b: Buffer): Promise<string> {
  return await imghash.hash(b, 8, 'binary');
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

  const matches = r.exec(uuid);
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
