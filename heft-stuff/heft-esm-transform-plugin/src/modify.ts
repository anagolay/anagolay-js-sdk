/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * taken from https://gist.github.com/silassare/cc3db860edeea07298cb03f64738c997
 */

import * as fs from 'fs';
import * as path from 'path';
// import { fileURLToPath } from 'url';

const DEBUG: boolean = !!process.env.DEBUG_ESM_ADD || false;

interface IOptions {
  sourceFileFilter: (sourceFilePath: string) => boolean;
  moduleFilter: (importedModule: string) => boolean;
}

const defaultOptions: IOptions = {
  sourceFileFilter: defaultSourceFileFilter,
  moduleFilter: defaultModuleFilter
};

function defaultSourceFileFilter(sourceFilePath: string): boolean {
  return /\.(js|ts)$/.test(sourceFilePath) && !/node_modules/.test(sourceFilePath);
}

function defaultModuleFilter(importedModule: string): boolean {
  return (
    !path.isAbsolute(importedModule) && !importedModule.startsWith('@') && !importedModule.endsWith('.js')
  );
}

// https://gist.github.com/lovasoa/8691344
async function* walk(dir: string): any {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) {
      yield* walk(entry);
    } else if (d.isFile()) {
      yield entry;
    }
  }
}

function resolveImportPath(sourceFile: string, importPath: string, options: IOptions): undefined | string {
  const sourceFileAbs = path.resolve(process.cwd(), sourceFile);
  const root = path.dirname(sourceFileAbs);
  const { moduleFilter = defaultModuleFilter } = options;

  if (moduleFilter(importPath)) {
    const importPathAbs = path.resolve(root, importPath);
    const possiblePath = [
      path.resolve(importPathAbs, './index.ts'),
      path.resolve(importPathAbs, './index.js'),
      importPathAbs + '.ts',
      importPathAbs + '.js'
    ];

    if (possiblePath.length) {
      for (let i = 0; i < possiblePath.length; i++) {
        const entry = possiblePath[i];
        if (fs.existsSync(entry)) {
          const resolved = path.relative(root, entry.replace(/\.ts$/, '.js'));

          if (!resolved.startsWith('.')) {
            return './' + resolved;
          }

          return resolved;
        }
      }
    }
  }

  return undefined;
}

function replace(filePath: string, outFilePath: string, options: IOptions): void {
  const code = fs.readFileSync(filePath).toString();
  let newCode = code;

  // only imports
  newCode = code.replace(
    /(import) ('[^\n']+'|"[^\n"]+");?/gs,
    function (found: string, importString: string, imported: string) {
      const importPath = imported.slice(1, -1);
      const resolvedPath = resolveImportPath(filePath, importPath, options);
      if (resolvedPath) {
        if (DEBUG) {
          console.debug('\t import %s -> %s', importPath, resolvedPath);
        }
        return `${importString} '${resolvedPath}';`;
      }
      // return what you found
      return found;
    }
  );

  newCode = newCode.replace(
    /(import|export) (.+?) from ('[^\n']+'|"[^\n"]+");?/gs,
    function (found: string, action: string, imported: string, from: string) {
      // console.log('import/export', { found, action, imported, from });
      const importPath = from.slice(1, -1);
      const resolvedPath = resolveImportPath(filePath, importPath, options);

      if (resolvedPath) {
        if (DEBUG) {
          console.debug('\t %s %s -> %s', action, importPath, resolvedPath);
        }
        return `${action} ${imported} from '${resolvedPath}';`;
      }

      return found;
    }
  );

  if (code !== newCode) {
    fs.writeFileSync(outFilePath, newCode);
  }
}

// Then, use it with a simple async for loop
export async function run(srcDir: string, options: IOptions = defaultOptions): Promise<void> {
  const { sourceFileFilter = defaultSourceFileFilter } = options;

  for await (const entry of walk(srcDir)) {
    if (sourceFileFilter(entry)) {
      if (DEBUG) {
        console.debug('entry', entry);
      }
      replace(entry, entry, options);
    }
  }
}

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// console.log(__filename);
// console.log(__dirname);

// console.log(resolve(process.cwd(), process.argv[2] || './lib'));

// const libPath: string = resolve(process.cwd(), 'lib');

// /**
//  * RUN THE STUFF
//  */
// await run(libPath, defaultOptions);
