let assert = require('assert')
let { txid } = require('/jail/student/send-transaction.js')

function isSha256(h) {
  const regex = /^[a-f0-9]{64}$/gi
  return regex.test(h)
}

describe('Send transaction', function () {
  it('Should return a valid txid', function () {
    assert.ok(isSha256(txid))
  })
})
