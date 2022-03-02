import stringToCamelCase from '@anagolay/core/util/stringToCamelCase';

describe('CLI::generator', () => {
  it('should return correct camelCase strings', () => {
    const list = ['came case', 'Camel case', 'camel-case', 'camel_case', '0-camel_case'];
    const l = list.map((l) => stringToCamelCase(l));
    const res = ['cameCase', 'camelCase', 'camelCase', 'camelCase', '0CamelCase'];

    expect(l).toEqual(res);
  });
});
