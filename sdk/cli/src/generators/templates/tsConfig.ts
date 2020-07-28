const tsConfigJson = (): Object => ({
  extends: '../../tsconfig.json',
  compilerOptions: {
    outDir: 'lib',
    rootDir: 'src'
  },
  include: ['./src'],
  exclude: ['lib'],
  references: [{ path: '../../sdk/types' }]
})

export default tsConfigJson
