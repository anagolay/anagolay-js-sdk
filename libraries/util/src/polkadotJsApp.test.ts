import { makeBlockUrl } from './polkadotJsApp';

describe('Test polkadotJsApp.ts', () => {
  it('makeBlockUrl should contain the query route', async () => {
    const url = makeBlockUrl('ws://localhost:9944', '0xsdasdasdada');
    expect(url.toString()).toContain('explorer/query/');
  });
});
