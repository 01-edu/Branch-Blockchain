let assert = require('assert')
let { tx } = require("/jail/student/send-transaction-to-peer.js")

function isSha256(h) {
  const regex = /^[a-f0-9]{64}$/gi
  return regex.test(h)
}

describe('Send transaction', function () {
  it('Should have a valid txid', function () {
    assert.ok(isSha256(tx.txid))
  })

  it('Should have a valid date', function () {
    let currentDate = Math.round(new Date().getTime() / 1000)// in seconds
    assert.ok(Math.abs(currentDate - tx.time) < 172800) // 48h max delay
  })

  it('Should have a valid amount', function () {
    assert.ok(tx.amount == -0.00001337)
  })
  it('Should have fee as a negative integer', function () {
    assert.ok(tx.fee < 0)
  })
  it('Should have reasonable fees', function () {
    assert.ok(tx.fee > - 0.1)
  })
})
