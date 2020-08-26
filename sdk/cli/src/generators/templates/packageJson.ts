import { SnOperation } from '@sensio/types'
import { isEmpty } from 'ramda'
import { generateNpmName } from '..'

const packageJson = (op: SnOperation): Object => {
  const deps: { [k: string]: string } = {}

  op.data.ops.forEach(o => {
    const opName = generateNpmName(o.data.name)
    deps[opName] = '^0.1.0'
  })

  const encodingDeps: string[] = []
  const hashingDep: string[] = []

  if (!isEmpty(op.data.encOp)) {
    encodingDeps.push(`"${generateNpmName(op.data.encOp)}":"^0.1.0"`)
  }

  if (!isEmpty(op.data.hashingOp)) {
    hashingDep.push(`"${generateNpmName(op.data.hashingOp)}":"^0.1.0"`)
  }

  return {
    name: generateNpmName(op.data.name),
    version: '0.1.0',
    license: 'Apache-2.0',
    author: 'daniel@woss.io',
    main: 'src/index',
    types: 'lib/index.d.ts',
    files: ['lib/**/*'],
    directories: {
      lib: 'lib'
    },
    publishConfig: {
      access: 'public'
    },
    scripts: {
      build: 'tsc -b .',
      std: 'ts-standard --fix'
    },
    devDependencies: {
      'ts-standard': '^8.0.1',
      typescript: '^3.9.5'
    },
    dependencies: {
      '@polkadot/util': '^3.0.1',
      '@sensio/core': '^0.1.0',
      '@sensio/types': '^0.3.0',
      ...deps,
      ...encodingDeps,
      ...hashingDep
    },

    repository: {
      type: 'git',
      url: 'git+https://gitlab.com/sensio_group/network-js-sdk.git'
    },
    bugs: {
      url: 'https://gitlab.com/sensio_group/network-js-sdk/issues'
    },
    homepage: 'https://gitlab.com/sensio_group/network-js-sdk#readme',
    'ts-standard': {
      ignore: ['lib']
    }
  }
}

export default packageJson
