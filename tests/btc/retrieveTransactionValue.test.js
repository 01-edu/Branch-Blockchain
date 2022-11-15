// node test
//TODO might need to check trigger tx
const { expect } = require("chai");
const Client = require('bitcoin-core');
const  {retrieveTransactionValue}= require("/jail/student/retrieveTransactionValue.js")

describe("retrieve transaction value", function() { 
  let client

  beforeEach( async function () {
    client = new Client({ 
      network: 'regtest', 
      username: 'leeloo', 
      password: 'multipass', 
      port: 18443 
    })
    // client.generateToAddress(101, "bcrt1qznrqryhtzr66tp8uzrxsuh58mn2vpfmjxpnxgz")
  })
  
  it("Value of the latest coinbase is correct", async function() {
    let hashLatest = await client.getBestBlockHash()
    console.assert(hashLatest!=null)
    let block = await client.getBlockByHash(hashLatest)
    let value = block.tx[0].vout[0].value //.txid
    let txLatest = block.tx[0].txid
    console.table("🤓 block txs", block.tx)
    let retrievedValue = await retrieveTransactionValue(txLatest)
    expect(retrievedValue).to.equal(value)
  })

  it("Value of the latest transaction is correct", async function() {
    let hashLatest = await client.getBestBlockHash()
    console.assert(hashLatest!=null)
    let block = await client.getBlockByHash(hashLatest)
    let value = 0
    for (const vout of block.tx[1].vout) { // expect a second transaction in the latest block (see dockefile)
      value += vout.value
    }
    let txLatest = block.tx[1].txid
    let retrievedValue = await retrieveTransactionValue(txLatest)
    expect(retrievedValue).to.equal(value)
  })
})

