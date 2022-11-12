import {
  HeftConfiguration,
  HeftSession,
  IBuildStageContext,
  IBundleSubstage,
  IHeftPlugin,
  ScopedLogger
} from '@rushstack/heft';
import { readFile } from 'fs/promises';

import { run } from './modify';
import { createFiles } from './packageJson';

/**
 * @internal
 */
interface IHeftOptions {
  esmDirectory: string;
  addPackageJsonFiles: boolean;
  commonJsDirectory: string;
}

const PLUGIN_NAME: string = 'ESMTransformationPlugin';
/**
 * @internal
 */
export class ESMTransformationPlugin implements IHeftPlugin<IHeftOptions> {
  public readonly pluginName: string = PLUGIN_NAME;
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  apply(
    heftSession: HeftSession,
    heftConfiguration: HeftConfiguration,
    options: IHeftOptions = {
      esmDirectory: 'lib',
      addPackageJsonFiles: true,
      commonJsDirectory: 'lib-commonjs'
    }
  ): void {
    const logger: ScopedLogger = heftSession.requestScopedLogger('esm-transformation-plugin');

    heftSession.hooks.build.tap(PLUGIN_NAME, async (build: IBuildStageContext) => {
      build.hooks.bundle.tap(PLUGIN_NAME, (bundle: IBundleSubstage) => {
        bundle.hooks.run.tapPromise(PLUGIN_NAME, async () => {
          const { esmDirectory, addPackageJsonFiles, commonJsDirectory } = options;

          const esmDirectoryPath: string = (await heftConfiguration.rigConfig.tryResolveConfigFilePathAsync(
            esmDirectory
          )) as string;

          const commonJsDirectoryPath: string =
            (await heftConfiguration.rigConfig.tryResolveConfigFilePathAsync(commonJsDirectory)) as string;

          logger.terminal.writeLine(`Running the ESM transformations for the ${esmDirectory} directory`);

          await run(esmDirectoryPath);

          if (addPackageJsonFiles) {
            const packageJsonPath: string = (await heftConfiguration.rigConfig.tryResolveConfigFilePathAsync(
              'package.json'
            )) as string;

            const { name } = JSON.parse((await readFile(packageJsonPath)).toString());

            logger.terminal.writeVerboseLine(`Adding package.json files to the ${esmDirectoryPath}`);
            createFiles(esmDirectoryPath, 'module', name);

            logger.terminal.writeVerboseLine(`Adding package.json files to the ${commonJsDirectoryPath}`);
            createFiles(commonJsDirectoryPath, 'commonjs', name);
          }
        });
      });
    });
  }
}
