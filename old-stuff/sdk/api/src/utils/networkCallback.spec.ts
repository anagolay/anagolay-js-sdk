import { describe, expect, it } from '@jest/globals';

import { networkCallback } from './networkCallback';

describe('api::utils::networkCallback', () => {
  it('should be defined, networkCallback', () => {
    expect(networkCallback).toBeDefined();
  });
  it.skip('should be implemented the rest', () => {
    expect(true).toBe(true);
  });
});
