import { SnOperation } from '@sensio/types'
import { generateNpmName } from '..'

const packageJson = (op: SnOperation): Object => {
  const deps: { [k: string]: string } = {}

  op.data.ops.forEach(o => {
    const opName = generateNpmName(o.data.name)
    deps[opName] = '^0.1.0'
  })

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
      '@sensio/types': '^0.3.0',
      ...deps
    },

    repository: {
      type: 'git',
      url: 'git+https://gitlab.com/sensio_group/network-js.git'
    },
    bugs: {
      url: 'https://gitlab.com/sensio_group/network-js/issues'
    },
    homepage: 'https://gitlab.com/sensio_group/network-js#readme',
    'ts-standard': {
      ignore: ['lib']
    }
  }
}

export default packageJson
