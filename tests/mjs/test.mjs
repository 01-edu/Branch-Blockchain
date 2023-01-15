// Modified version of js/tests/tests.mjs to run nodejs code XL
const DEBUG = true


import { join as joinPath, dirname } from 'path'
import { fileURLToPath } from 'url'
import { deepStrictEqual } from 'assert'
import * as fs from 'fs'
const { readFile, writeFile } = fs.promises
// eval for nodejs code
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// const vm = require('vm')
// import  * as vm from 'vm'


global.window = global
global.fetch = (url) => {
  // this is a fake implementation of fetch for the tester
  // -> refer to https://devdocs.io/javascript/global_objects/fetch
  const accessBody = async () => { throw Error('body unavailable') }
  return {
    ok: false,
    type: 'basic',
    status: 500,
    statusText: 'Internal Server Error',
    json: accessBody,
    text: accessBody,
  }
}

const wait = delay => new Promise(s => setTimeout(s, delay))
const fail = fn => { try { fn() } catch (err) { return true } }
const { join } = []
const { split } = ''
const eq = (a, b) => {
  const noSplit = !''.split
  const noJoin = ![].join
  String.prototype.split = split
  Array.prototype.join = join
  deepStrictEqual(a, b)
  noSplit && (String.prototype.split = undefined)
  noJoin && (Array.prototype.join = undefined)
  return true
}

const name = process.argv[2]
const fatal = (...args) => {
  console.error(...args)
  process.exit(1)
}

if (!name) fatal('missing exercise, usage:\nnode test exercise-name')

const ifNoEnt = fn => err => {
  if (err.code !== 'ENOENT') throw err
  fn(err)
}

const root = dirname(fileURLToPath(import.meta.url))
const read = (filename, description) =>
  readFile(filename, 'utf8').catch(
    ifNoEnt(() => fatal(`Missing ${description} for ${name}`)),
  )

const stackFmt = (err, url) => {
  if (!(err instanceof Error)) {
    throw Error(`Unexpected type thrown: ${typeof err}. usage: throw Error('my message')`)
  }
  String.prototype.split = split
  Array.prototype.join = join
  return err.stack.split(url).join(`${name}.js`)
}

const main = async () => {
  const [test, rawCode] = await Promise.all([
    read(joinPath(root, `${name}.test.js`), 'test'),
    // Local version XL
    read(joinPath(root, `${name}.sl.js`), 'student solution'),
    // Prod XL 
    // read(`/jail/student/${name}.js`, 'student solution'),
  ])

  // this is a very crude and basic removal of comments
  // since checking code is only use to prevent cheating
  // it's not that important if it doesn't work 100% of the time.
  const code = rawCode.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim()
  if (code.includes('import')) fatal('import keyword not allowed')

  const parts = test.split('// /*/ // ⚡')
  const [inject, testCode] = parts.length < 2 ? ['', test] : parts
  const combined = `${inject.trim()}\n${rawCode
    .replace(inject.trim(), '')
    .trim()}\n${testCode.trim()}\n`

  // const b64 = Buffer.from(combined).toString('base64')
  // const url = `data:text/javascript;base64,${b64}`
  // const { setup, tests } = await import(url).catch(err =>
  //   fatal(`Unable to execute ${name} solution, error:\n${stackFmt(err, url)}`),
  // )
  // let sandBox1 = vm.createContext({foo:'bar', require});
  // vm.runInThisContext(combined,sandBox1)
  // Node eval XL
  const tests = []
  let setup
  const t = (f) => tests.push(f)
  eval(combined)

  const ctx = (await ( setup && setup())) || {} 
  const tools = { eq, fail, wait, code, ctx }
  for (const [i, t] of tests.entries()) {
    try {
      if (!await t(tools)) {
        throw Error('Test failed')
      }
    } catch (err) {
      console.warn("\x1b[33m",`Test #${i} failed:\n${t.toString()}\n`, "\x1b[0m")
      fatal(stackFmt(err))//, url))
    }
  }
  console.log("\x1b[32m",`\n✔ ${name} passed (${tests.length} tests)`, "\x1b[0m")
}

main().catch(err => fatal(err.stack))
