import { stringToCamelCase } from './index'
describe('CLI::generator', () => {
  it('should return correct camelCase strings', () => {
    const list = [
      'sn came case',
      'Sn Camel case',
      'sn-camel-case',
      'sn_camel_case',
      'sn_0-camel_case',
    ]
    const l = list.map((l) => stringToCamelCase(l))
    const res = ['snCameCase', 'snCamelCase', 'snCamelCase', 'snCamelCase', 'sn0CamelCase']
    expect(l).toEqual(res)
  })
})
