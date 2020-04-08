// import { rule } from './runtime/poe/operations/poe-photo';
// import { createRulePayload } from './runtime/poe';

import { createRule, getRules } from './runtime/poe';
import { setupConnection, getAlice } from './setupConnection';

async function main(): Promise<void> {
  console.log('s');
  const api = await setupConnection();
  const alice = getAlice();

  await createRule(api, alice);
  setInterval(async () => {
    await getRules(api);
  }, 7000);

  // to create a poe rule

  // await processImageForPoE(resolve('../assets/test-photos/copyrighted-image.jpg'));
  // await processImageForPoE(resolve('../assets/test-photos/copyrighted-image.dng'));
  // await processImageForPoE(resolve('../assets/test-photos/_MG_4991.CR2'));

  // formatToUUID('C4CEBFD8B6A782A5E0DC32AFE31D6D09');
}

main().catch((e) => console.error('Something went wrong with the connection or something else', e));
// main().catch(console.error).finally(() => process.exit());
