import { EVENT_NAME_BATCH, EVENT_NAME_ERROR, EVENT_NAME_SINGLE } from './config';

describe('Pallets::Operation - config', () => {
  it('should be defined, EVENT_NAME_BATCH', () => {
    expect(EVENT_NAME_BATCH).toBeDefined();
  });
  it('should be defined, EVENT_NAME_ERROR', () => {
    expect(EVENT_NAME_ERROR).toBeDefined();
  });
  it('should be defined, EVENT_NAME_SINGLE', () => {
    expect(EVENT_NAME_SINGLE).toBeDefined();
  });
});
