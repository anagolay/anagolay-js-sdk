/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse, serialize, serializeThenParse } from './json';

interface IFistObject {
  s: string;
  n: number;
  b: boolean;
  ar: [];
  config: Map<any, any>;
}
const firstObjAsString = '{"s":"s","n":7,"b":true,"ar":[],"config":{"type":"Map","data":{"d":12}}}';

const firstObject = {
  s: 's',
  n: 7,
  b: true,
  ar: [],
  config: new Map().set('d', 12),
};

describe('JSON test suite', () => {
  it('should test the roundTrip', () => {
    const parsed = serializeThenParse(firstObject);
    expect(parsed).toEqual(parsed);
  });
  it('should test the parsing', () => {
    const parsed = parse<IFistObject>(firstObjAsString);

    expect(parsed).toEqual(firstObject);
  });
  it('should test serialization', () => {
    expect(serialize(firstObject)).toEqual(firstObjAsString);

    expect(
      serialize({
        s: 's',
        n: 7,
        b: true,
        ar: [],
        config: { d: 12 },
      })
    ).toEqual('{"s":"s","n":7,"b":true,"ar":[],"config":{"d":12}}');
  });
  it('should test native replacer', () => {
    expect(
      serialize(
        {
          s: 's',
          n: 7,
        },
        0,
        ['s']
      )
    ).toEqual('{"s":"s"}');
  });
});
