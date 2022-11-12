export {};

// import type { Handle } from '@sveltejs/kit';
// import { sequence } from '@sveltejs/kit/hooks';

// const first: Handle = async ({ event, resolve }) => {
//   console.log('first pre-processing');
//   const result = await resolve(event, {
//     transformPageChunk: ({ html }) => {
//       // transforms are applied in reverse order
//       console.log('first transform');
//       return html;
//     }
//   });
//   console.log('first post-processing');
//   return result;
// };

// const second: Handle = async ({ event, resolve }) => {
//   console.log('second pre-processing');
//   const result = await resolve(event, {
//     transformPageChunk: ({ html }) => {
//       console.log('second transform');
//       return html;
//     }
//   });
//   console.log('second post-processing');
//   return result;
// };

// export const handle = sequence(first, second);
