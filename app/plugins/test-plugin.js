/** @type {import('vite').Plugin} */
export default function () {
  return {
    name: 'log-request-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // console.log(`Got request ${req.url}`);
        // if (req.url.includes('@polkadot')) {
        //   console.log('[my-plugin]', req.url);
        // }
        next();
      });
    }
  };
}
