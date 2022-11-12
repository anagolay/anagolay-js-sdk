import type { IHeftPlugin } from '@rushstack/heft';

import { ESMTransformationPlugin } from './plugin';

/**
 * @public
 */
export default new ESMTransformationPlugin() as IHeftPlugin;
