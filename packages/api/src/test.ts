import { setupConnection } from '@sensioApi/api';

async function main() {
  const api = await setupConnection();
  api.tx;
  console.log(api);
}

main();
