/**
 * Creates camelCase string from any string, character that are after numbers are not camelized
 ```ts
  const list = ['sn came case', 'Sn Camel case', 'sn-camel-case', 'sn_camel_case']
  const l = list.map(l=>stringToCamelCase(l))
  // ["snCameCase", "snCamelCase", "snCamelCase", "snCamelCase"]
  ```
 *
 * @param str String to make camelCase out of
 */
export default function stringToCamelCase(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => chr.toUpperCase())
}
