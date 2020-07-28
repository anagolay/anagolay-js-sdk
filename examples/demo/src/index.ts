import ops from './ops'
import rules from './rules'
import gen from './test-gen'

async function main (): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_path, _fileName, what] = process.argv

  switch (what) {
    case 'gen':
      await gen()
      break
    case 'ops':
      await ops()
      break
    case 'rules':
      await rules()
      break

    default:
    case 'all':
      await rules()
      await ops()
      break
  }

  return 'main done'
}

main()
  .then(console.log)
  .catch(console.error)
