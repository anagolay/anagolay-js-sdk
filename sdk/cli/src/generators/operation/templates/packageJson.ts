import generateNpmName from '@anagolay/core/util/generateNpmName'
import stringToCamelCase from '@anagolay/core/util/stringToCamelCase'
import { AnOperation } from '@anagolay/types'
import { isEmpty } from 'ramda'
import { nameToKeywords } from '..'

const packageJson = (op: AnOperation): unknown => {
  const deps: { [k: string]: string } = {}

  op.data.ops.forEach((o) => {
    const opName = generateNpmName(o.data.name)

    deps[opName] = '^0.1.0'
  })

  const encodingDeps: { [k: string]: string } = {}
  const hashingDep: { [k: string]: string } = {}

  if (!isEmpty(op.data.encOp)) {
    const opName = generateNpmName(op.data.encOp)

    encodingDeps[opName] = '^0.1.0'
  }

  if (!isEmpty(op.data.hashingOp)) {
    const opName = generateNpmName(op.data.hashingOp)

    hashingDep[opName] = '^0.1.0'
  }

  const ret = {
    name: generateNpmName(op.data.name),
    version: '0.1.0',
    license: 'Apache-2.0',
    author: 'daniel@woss.io',
    description: op.data.desc,
    main: 'lib/index',
    files: ['lib'],
    keywords: ['anagolay', 'operations', ...nameToKeywords(op.data.name)],
    publishConfig: {
      access: 'public',
    },
    scripts: {
      build: 'tsc -b .',
      std: 'ts-standard --fix',
    },
    devDependencies: {
      'ts-standard': '^8.0.1',
      typescript: '^3.9.5',
    },
    dependencies: {
      '@anagolay/types': '^0.1.0',
      '@anagolay/util': '^3.0.1',
      '@anagolay/core': '^0.1.0',
      ...deps,
      ...encodingDeps,
      ...hashingDep,
    },
    repository: {
      type: 'git',
      url: 'https://gitlab.com/anagolay/network-js-sdk.git',
      directory: `operations/${stringToCamelCase(op.data.name)}`,
    },
    bugs: {
      url: 'https://gitlab.com/anagolay/network-js-sdk/issues',
    },
    homepage: `https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/${stringToCamelCase(
      op.data.name,
    )}#readme`,
    'ts-standard': {
      ignore: ['lib'],
    },
  }

  return ret
}

export default packageJson
