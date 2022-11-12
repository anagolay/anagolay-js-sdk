/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { isNil } from 'ramda';

export declare type Jsonify<T> = T extends Date
  ? string
  : T extends object
  ? {
      [k in keyof T]: Jsonify<T[k]>;
    }
  : T extends Record<any, AnyJson>
  ? any
  : T;

export declare type AnyJson =
  | string
  | number
  | boolean
  | null
  | undefined
  | AnyJson[]
  | {
      [index: string]: AnyJson;
    };
/**
 * Taken from the native types
 */
type ReplacerOrReviverAsFunction<V> = (key: string, value: V) => ISerializedMap<V> | V | Map<any, any>;

/**
 * Taken from the native types
 */
type ReplacerAsArray = (number | string)[] | undefined;

export interface ISerializedMap<T> {
  type: 'Map';
  data: T;
}

/**
 * Custom replacer function to handle edge cases and types that don't have native serialization support.
 *
 * @remarks
 * List of supported serializations that don't have native suport
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 *
 *
 * @param _key - First invocation this is empty, next ones is the `key` of the object
 * @param value - First invocation is the full payload, nex ones is the object key value
 * @returns
 */
export function customReplacer<V>(_key: string, value: V): ISerializedMap<V> | V {
  if (value instanceof Map) {
    return {
      type: 'Map',
      data: Object.fromEntries(value)
    };
  } else {
    return value;
  }
}

/**
 *
 * @param _key -
 * @param value -
 * @returns
 */
export function customReviver<T extends ISerializedMap<T>>(_key: string, value: T): T | Map<any, any> {
  if (typeof value === 'object' && value !== null) {
    if (value.type === 'Map' || value.type === 'map') {
      return new Map(Object.entries(value.data));
    }
  }
  return value;
}

/**
 * Wrapper around the JSON.parse with defaults for de-serialization of the non native object like `Map`.
 *
 * @remarks
 * It's fully typed thanks to the generics. To get the type autocompletion see [test file](./index.test.ts)
 * @param data - String data produced with `JSON.stringify`
 * @param reviver - A function that knows how to handle custom de-serialization. Opposite of {@link  customReplacer}
 * @returns
 */
export function parse<T>(data: string, reviver?: ReplacerOrReviverAsFunction<T>): T {
  let reviverParam = reviver;

  if (isNil(reviverParam)) {
    reviverParam = customReviver as any;
  }

  const parsed = JSON.parse(data, reviverParam as any);

  return parsed;
}

/**
 * Wraps the `JSON.stringify` with the replacer function which is aware of the javascript `Maps`
 *
 * @remarks
 * This implementation can be used almost as a drop in replacement to native JSON.stringify with only one difference. Native JSON.stringify has following signature `(data,replacer,space)` where this function has `(data,space,replacer)`. This is done intentionally because most of the time we customize the `space` and not the `replacer`.
 *
 * @param data -`T` generic value. Same type as it is in the `JSON.stringify`
 * @param space - How many spaces will be added to the serialization process.
 * @param replacer - Accepts the same types as native implementation ({@link ReplacerOrReviverAsFunction} and {@link ReplacerAsArray}), by default will use {@link customReplacer}.
 *
 * @returns String with executed `replacer` function if no replacer is provided
 */
export function serialize<T>(
  data: T,
  space?: number,
  replacer?: ReplacerOrReviverAsFunction<T> | ReplacerAsArray | undefined | null
): string {
  let repl = replacer;

  if (!isNil(repl)) {
    repl = customReplacer;
  } else {
    repl = null;
  }

  const d = JSON.stringify(data, repl as any, space);
  return d;
}

/**
 * This does `JSON.parse(serialize(x))` with inferring the type. It doesn't use the custom reviver function. It just parses the serialized string.
 *
 * @remarks
 *
 * - The biggest use of this is to get the types autocompleted.
 * - The performance is NOT tested, it might be really slow
 *
 * @param data - Any defined `T` or nothing, then the T will be inferred
 * @param toOriginal - Use reviver function to return the JSON to it's original state
 * @returns Parsed serialized data with type inferring
 */
export function serializeThenParse<T>(data: T, toOriginal: boolean = false): T {
  if (toOriginal) {
    return parse<T>(serialize<T>(data));
  } else {
    return JSON.parse(serialize<T>(data));
  }
}
