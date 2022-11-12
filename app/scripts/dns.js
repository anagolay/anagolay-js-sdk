/**
 * playing around with dns for node
 */

import { Resolver } from 'dns/promises';
import { argv } from 'process';

async function main() {
  console.log('Querying for the domain %s', argv[2]);
  const domain = argv[2] || 'woss.io';

  const resolver = new Resolver();
  resolver.setServers(['1.1.1.1', '4.4.4.4', '8.8.8.8']);

  console.log('Servers', await resolver.getServers());
  console.log('Txt records', await resolver.resolveTxt(domain));
  console.log('Soa records', await resolver.resolveSoa(domain));
  console.log('A record', await resolver.resolve(domain, 'A'));
  console.log('IPv4 record', await resolver.resolve4(domain));

  // below ones are with errors
  try {
    console.log('CNAME record', await resolver.resolveCname(domain));
    console.log('SRV record', await resolver.resolveSrv(domain));
    console.log('NAPTR record', await resolver.resolveNaptr(domain));
  } catch (error) {
    console.log;
  }
}

main().catch(console.error);
