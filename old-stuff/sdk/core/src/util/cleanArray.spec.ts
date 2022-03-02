import cleanArray from './cleanArray';

describe('cleanArray', () => {
  it('should be defined', () => {
    expect(cleanArray).toBeDefined();
  });
  it('should clean array', () => {
    const dirtyArray = [undefined, null, 'value'];
    const clean = cleanArray(dirtyArray);

    expect(clean).toStrictEqual(['value']);
  });
});
