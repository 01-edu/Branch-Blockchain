const { expect } = require("chai");
const Client = require('bitcoin-core');
const  {retrieveTransactionInOut}= require("/jail/student/retrieveTransactionInOut.js")

describe("retrieve transaction ins and outs", function() { 
  let client, hashLatest, txLatest

  beforeEach( async function () {
    client = new Client({ 
      network: 'regtest', 
      username: 'leeloo', 
      password: 'multipass', 
      port: 18443
    })
    let blockchainInfo = await client.getBlockchainInfo()
    console.log("🤓 blockchaininfo", blockchainInfo)
    let result = await client.sendToAddress('bcrt1qznrqryhtzr66tp8uzrxsuh58mn2vpfmjxpnxgz', 0.5,  'sendtoaddress example', 'Testaddress from Xalava')   
    console.log("🤓 TX", result)
    let mempool = await client.getMemoryPoolInformation()
    console.log("🤓 mempool", mempool)
    client.generateToAddress(2, "bcrt1qznrqryhtzr66tp8uzrxsuh58mn2vpfmjxpnxgz")
    hashLatest = await client.getBestBlockHash()
  })
  
  it("latest tx is ok", async function() {
    let block = await client.getBlockByHash(hashLatest)
    let value = block.tx[0].vout[0].value //.txid
    client.getTransactionByHash('b4dd08f32be15d96b7166fd77afd18aece7480f72af6c9c7f9c5cbeb01e686fe', { extension: 'json', summary: false });
    let retrievedValue = await retrieveTransactionInOut(txLatest)
    console.log("🤓 retrievedValue", retrievedValue)
    expect(retrievedValue).to.equal(value)
  })
})

