// node test
//TODO might need to check trigger tx
const { expect } = require("chai");
const Client = require('bitcoin-core');
const  {retrieveTransactionValue}= require("/jail/student/retrieveTransactioValune.sl.js")

describe("retrieve transaction value", function() { 
  let client, hashLatest, txLatest

  beforeEach( async function () {
    client = new Client({ 
      network: 'regtest', 
      username: 'leeloo', 
      password: 'multipass', 
      port: 18443 
    })
    // client.generateToAddress(101, "bcrt1qznrqryhtzr66tp8uzrxsuh58mn2vpfmjxpnxgz")
    hashLatest = await client.getBestBlockHash()
  })
  
  it("latest tx is ok", async function() {
    let block = await client.getBlockByHash(hashLatest)
    let value = block.tx[0].vout[0].value //.txid
    console.log(value)

    client.sendToAddress('mmXgiR6KAhZCyQ8ndr2BCfEq1wNG2UnyG6', 0.1,  'sendtoaddress example', 'Nemo From Example.com');

    // console.log(txLatest)
    // let lastTX = await client.getTransactionByHash(txLatest)//getVout
    // let value = 0
    // value = lastTX.vout[0].value
    // (
    //     x => value += x.amount
    // )
    // console.log(value)
    let retrievedValue = await retrieveTransactionValue(txLatest)
    expect(retrievedValue).to.equal(value)
  })
})

