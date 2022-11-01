import { Codec } from '@polkadot/types/types';

/**
 * Converts the model from polkadot to anagolay
 *
 * @remarks
 *
 * https://ipfs.anagolay.network/ipfs/QmNuZM4KGfyTMZr8DSrN5xgaMShHgCyXuDCP7AseAFHxuF?filename=BtreeMap%20hashing%20the%20key.png
 *
 * @param polkadotModel -
 * @returns
 */
export function convertModel<T>(polkadotModel: Codec, isExtended: boolean = true): T {
  // return serializeThenParse<Struct | Raw>(polkadotModel.toHuman(), true);
  // we want to get the typings from the T. and setting it as unknown then T makes it possible and TS is happy
  return polkadotModel.toHuman(isExtended) as unknown as T;
}
