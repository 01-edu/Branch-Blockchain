const { expect } = require("chai");
const Client = require('bitcoin-core');
const  {retrieveTransactionInOut}= require("/jail/student/retrieve-transaction-in-out.js")

describe("retrieve transaction ins and outs", function() { 
  let client, hashLatest, txLatest

  beforeEach( async function () {
    client = new Client({ 
      network: 'regtest', 
      username: 'leeloo', 
      password: 'multipass', 
      port: 18443
    })
  })
  
  it("Value of the latest transaction is correct", async function() {
    let hashLatest = await client.getBestBlockHash()
    console.assert(hashLatest!=null)
    let block = await client.getBlockByHash(hashLatest)
    let values = []
    // expect a second transaction in the latest block (see dockerfile)
    for (const vout of block.tx[1].vout) { 
      values.push(vout.value)
    }
    let txLatest = block.tx[1].txid
    let retrievedInOuts = await retrieveTransactionInOut(txLatest)
    expect(retrievedInOuts.out).to.deep.equal(values)
  })
  
})

