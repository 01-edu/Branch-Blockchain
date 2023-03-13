const crypto = require('crypto')
const fs = require('fs/promises')
const assert = require('assert')
const { hashFile } = require('/jail/student/hash-file.js')

const h = e => crypto.createHash('sha256').update(e).digest('hex')

const content = [
  'Desocupado lector: sin juramento me podrás creer que quisiera que este libro, como hijo del entendimiento, fuera el más hermoso, el más gallardo y más discreto que pudiera imaginarse.',
  '🌴'.repeat(Math.ceil(Math.random() * 100)),
  '',
]

// create test file to pass to student function
for (const i in content) {
  fs.writeFile(`./test${i}.txt`, content[i])
}

describe('HashFile tests', () => {
  for (const i in content) {
    it(`Test case ${i}`, async () => {
      const expected = h(content[i])
      const submitted = await hashFile(`./test${i}.txt`)
      assert.equal(submitted, expected)
    })
  }
})
