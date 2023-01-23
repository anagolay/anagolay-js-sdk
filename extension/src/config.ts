import { defaultTo } from 'ramda';

/**
 * The Chrome messaging port name for content scripts
 */
export const EXTENSION_PREFIX = defaultTo('anagolay_js', process.env.EXTENSION_PREFIX);

export const PORT_PREFIX = `${EXTENSION_PREFIX}-${defaultTo('', process.env.PORT_PREFIX)}`;

/**
 * Used for the content and SW scripts
 */
export const PORT_CONTENT = `${PORT_PREFIX}-content`;

/**
 * Used for communication from and to extension via the ServiceWorker
 */
export const PORT_EXTENSION = `${PORT_PREFIX}-extension`;
export const MESSAGE_ORIGIN_PAGE = `${PORT_PREFIX}-page`;
export const MESSAGE_ORIGIN_CONTENT = `${PORT_PREFIX}-content`;

// export const defaultChainWs: string = 'ws://localhost:9944';
export const defaultChainWs: string = 'wss://idiyanale-testnet.anagolay.io';

export const tokenName = 'IDI';
