const { expect } = require("chai")
const Client = require('bitcoin-core')
const { retrieveTransactionValue } = require("/jail/student/retrieve-transaction-value.js")
const { DEBUG } = require('/app/lib/helpers')

describe("retrieve transaction value", function () {
  let client

  beforeEach(async function () {
    client = new Client({
      network: 'regtest',
      username: 'leeloo',
      password: 'multipass',
      port: 18443
    })
  })

  it("Value of the latest coinbase is correct", async function () {
    let hashLatest = await client.getBestBlockHash()
    console.assert(hashLatest != null)
    let block = await client.getBlockByHash(hashLatest)
    let value = block.tx[0].vout[0].value //.txid
    let txLatest = block.tx[0].txid
    if (DEBUG) console.table("🤓 block txs", block.tx)
    let retrievedValue = await retrieveTransactionValue(txLatest)
    expect(retrievedValue).to.equal(value)
  })

  it("Value of the latest transaction is correct", async function () {
    let hashLatest = await client.getBestBlockHash()
    console.assert(hashLatest != null)
    let block = await client.getBlockByHash(hashLatest)
    let value = 0
    // expect a second transaction in the latest block (see dockerfile)
    if (typeof block.tx[1] !== 'undefined') {
      for (const vout of block.tx[1].vout) {
        value += vout.value
      }
    } else {
      throw new TypeError('Latest block does not have a second transaction')
    }
    let txLatest = block.tx[1].txid
    let retrievedValue = await retrieveTransactionValue(txLatest)
    expect(retrievedValue).to.equal(value)
  })
})

