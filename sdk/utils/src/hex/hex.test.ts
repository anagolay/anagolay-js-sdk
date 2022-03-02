import { hexToString } from './hex';

// this is woss
const baseHexString = '776f7373';

describe('Hex module test', () => {
  it('correctly return and decode prefixed hex string', () => {
    const prefixedHexString = `0x${baseHexString}`;
    const res = hexToString(prefixedHexString);
    expect(res).toEqual('woss');
  });
  it('correctly return and decode not prefixed hex string', () => {
    const res = hexToString(baseHexString);
    expect(res).toEqual('woss');
  });
  it('correctly return empty hex 0x', () => {
    const res = hexToString('0x');
    expect(res).toEqual('');
  });
});
