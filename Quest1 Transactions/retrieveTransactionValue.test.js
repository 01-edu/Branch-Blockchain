// node test
//TODO might need to check trigger tx
const { expect } = require("chai");
const Client = require('bitcoin-core');
const  {retrieveTransactionValue}= require("./retrieveTransactionValue.sl.js")

describe("retrieve transaction value", function() { 
  let client, hashLatest, timeLatest, txLatest

  beforeEach( async function () {
    client = new Client({ 
      network: 'regtest', 
      username: 'leeloo', 
      password: 'multipass', 
      port: 18443 
    })
    // client.generateToAddress(101, "bcrt1qznrqryhtzr66tp8uzrxsuh58mn2vpfmjxpnxgz")
    hashLatest = await client.getBestBlockHash()
    let block = await client.getBlock(hashLatest)
    txLatest = block.tx[0]
  })

  it("latest tx is ok", async function() {
    let lastTX = await client.getTransaction(txLatest)//getVout
    let value = 0
    lastTX.details.forEach(
        x => value += x.amount
    )
    let retrievedValue = await retrieveTransactionValue(txLatest)
    expect(retrievedValue).to.equal(value)
  })
})

