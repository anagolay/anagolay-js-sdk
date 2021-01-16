const tsConfigJson = (): unknown => ({
  extends: '../../tsconfig.json',
  compilerOptions: {
    outDir: 'lib',
    rootDir: 'src',
  },
  include: ['./src'],
  exclude: ['lib'],
  references: [
    {
      path: '../../sdk/types',
    },
    {
      path: '../../sdk/core',
    },
  ],
})

export default tsConfigJson
