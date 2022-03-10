import { parseURL, urlForRemote } from './git';

describe('Test git.ts', () => {
  it('urlForRemote should correctly handle the origin ', async () => {
    expect(await urlForRemote('origin')).toEqual('https://gitlab.com/anagolay/anagolay-js');

    // the reason this is done like this is because of the matching the part of the error since the same
    // failing will look like this in Italian `error: Remote 'origin' non esistente`
    // where the `error:` is always there
    let r: string;
    try {
      r = await urlForRemote('originDoesNotExis');
    } catch (error) {
      r = (error as Error).message;
      expect(r).toContain('error');
    }
  });
  it('parseURL should correctly return the values', () => {
    expect(parseURL('git://gitlab.com/edp/logger.git')).toEqual('https://gitlab.com/edp/logger');
    expect(parseURL('git@gitlab.com:edp/logger.git')).toEqual('https://gitlab.com/edp/logger');
    expect(parseURL('git://github.com/treygriffith/cellar.git')).toEqual(
      'https://github.com/treygriffith/cellar'
    );
    expect(parseURL('https://jpillora@github.com/banchee/tranquil.git')).toEqual(
      'https://github.com/banchee/tranquil'
    );
    expect(parseURL('https://jpillora@github.com/banchee/tranquil.git')).toEqual(
      'https://github.com/banchee/tranquil'
    );
    expect(parseURL('git@github.com:cnpm/cnpm.git')).toEqual('https://github.com/cnpm/cnpm');
    expect(parseURL('https://github.com/component/emitter/archive/1.0.1.tar.gz')).toEqual(
      'https://github.com/component/emitter'
    );
  });
});
