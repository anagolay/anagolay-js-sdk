import { writeFileSync } from 'fs';
import { resolve } from 'path';

import * as CustomTypes from './interfaces/definitions';

/**
 * Generate Custom Types JSON file so we can easily import it to other projects
 */
async function main(): Promise<void> {
  const t = {
    Address: 'AccountId',
    LookupSource: 'AccountId',
    ...CustomTypes.anagolaySupport.types,
    ...CustomTypes.operations.types,
    ...CustomTypes.poe.types,
    ...CustomTypes.workflows.types,
    ...CustomTypes.statements.types,
  };

  const realPath = resolve(__dirname, './customTypes.json');

  writeFileSync(realPath, JSON.stringify(t, null, 2));
}

main()
  .then(() => console.log('JSON created 😁'))
  .catch(console.error);
