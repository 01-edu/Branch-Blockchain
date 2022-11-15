const { expect } = require("chai");
const Client = require('bitcoin-core');
const  {retrieveBlockDate}= require("/jail/student/retrieveBlockDate.js")

describe("retrieve block date", function() { 
  let client, hashLatest, timeLatest

  beforeEach( async function () {
    client = new Client({ 
      network: 'regtest', 
      username: 'leeloo', 
      password: 'multipass', 
      port: 18443 //18445
    })
    hashLatest = await client.getBestBlockHash()
    let block = await client.getBlock(hashLatest)
    timeLatest = block.time
  })

  it("latest block is ok", async function() {
    let retrievedTime = await retrieveBlockDate(hashLatest)
    expect(retrievedTime).to.equal(timeLatest)
  })
})