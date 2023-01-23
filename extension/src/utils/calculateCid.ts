/**
 * A simple wrapper for Anagolay CID Workflow that is using the TextEncoder to create a Uint8Array, optimized for the Web. It also init the wasm
 * @param data - Any string
 * @returns
 */
export async function calculateCid(data: string): Promise<string> {
  // top level was breaking for some reason, needs investigation
  const lib = await import('wf_cidv1_from_array');
  const wasm = await import('wf_cidv1_from_array/wf_cidv1_from_array_bg.wasm?url');

  console.time('[an-wf:wasm-init]');
  // initialize wasm manually because the vite doesn't do it for us
  // this is the init of the wasm
  await lib.default(wasm.default);
  // .then(console.debug).catch(console.error);
  console.timeEnd('[an-wf:wasm-init]');

  /**
   * Here we create our workflow and calc the cid in ~1 ms
   */
  const start = new Date().getTime();
  const wf = new lib.Workflow();

  const te = new TextEncoder();
  const input = te.encode(data);
  const { output } = await wf.next([input]);
  const elapsedTime = new Date().getTime() - start + ' ms';
  console.debug('cid calculation: %s -> %s for size %s B', output, elapsedTime, data.length);

  return output;
}
