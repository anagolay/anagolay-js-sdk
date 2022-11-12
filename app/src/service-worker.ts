import { build, files, prerendered, version } from '$service-worker';

console.log('worker', { build, files, prerendered, version });
