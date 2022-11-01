/**
 * taken from https://gist.github.com/silassare/cc3db860edeea07298cb03f64738c997
 */

import * as fs from 'fs';
import * as path from 'path';
import { dirname, resolve } from 'path';
// import { fileURLToPath } from 'url';

// https://gist.github.com/lovasoa/8691344
async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) {
      yield* walk(entry);
    } else if (d.isFile()) {
      yield entry;
    }
  }
}

function resolveImportPath(sourceFile, importPath, options) {
  const sourceFileAbs = path.resolve(process.cwd(), sourceFile);
  const root = path.dirname(sourceFileAbs);
  const { moduleFilter = defaultModuleFilter } = options;

  if (moduleFilter(importPath)) {
    const importPathAbs = path.resolve(root, importPath);
    let possiblePath = [
      path.resolve(importPathAbs, './index.ts'),
      path.resolve(importPathAbs, './index.js'),
      importPathAbs + '.ts',
      importPathAbs + '.js',
    ];

    if (possiblePath.length) {
      for (let i = 0; i < possiblePath.length; i++) {
        let entry = possiblePath[i];
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

  return null;
}

function replace(filePath, outFilePath, options) {
  const code = fs.readFileSync(filePath).toString();
  let newCode = code;

  // only imports
  newCode = code.replace(/(import) ('[^\n']+'|"[^\n"]+");?/gs, function (found, importString, imported) {
    const importPath = imported.slice(1, -1);
    const resolvedPath = resolveImportPath(filePath, importPath, options);
    if (resolvedPath) {
      console.debug('\t import %s -> %s', importPath, resolvedPath);
      return `${importString} '${resolvedPath}';`;
    }
    // return what you found
    return found;
  });

  newCode = newCode.replace(
    /(import|export) (.+?) from ('[^\n']+'|"[^\n"]+");?/gs,
    function (found, action, imported, from) {
      // console.log('import/export', { found, action, imported, from });
      const importPath = from.slice(1, -1);
      const resolvedPath = resolveImportPath(filePath, importPath, options);

      if (resolvedPath) {
        console.debug('\t %s %s -> %s', action, importPath, resolvedPath);
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
async function run(srcDir, options = defaultOptions) {
  const { sourceFileFilter = defaultSourceFileFilter } = options;

  for await (const entry of walk(srcDir)) {
    if (sourceFileFilter(entry)) {
      console.debug('entry', entry);
      replace(entry, entry, options);
    }
  }
}

const defaultSourceFileFilter = function (sourceFilePath) {
  return /\.(js|ts)$/.test(sourceFilePath) && !/node_modules/.test(sourceFilePath);
};

const defaultModuleFilter = function (importedModule) {
  return (
    !path.isAbsolute(importedModule) && !importedModule.startsWith('@') && !importedModule.endsWith('.js')
  );
};

const defaultOptions = {
  sourceFileFilter: defaultSourceFileFilter,
  moduleFilter: defaultModuleFilter,
};

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// console.log(__filename);
// console.log(__dirname);

// console.log(resolve(process.cwd(), process.argv[2] || './lib'));

const libPath = resolve(process.cwd(), 'lib');

/**
 * RUN THE STUFF
 */
await run(libPath, defaultOptions);
