const { expect } = require("chai");
const Client = require('bitcoin-core');
const  {retrieveBlockDate}= require("/jail/student/retrieve-block-date.js")

describe("retrieve block date", function() { 
  let client, hashLatest, timeLatest

  beforeEach( async function () {
    client = new Client({ 
      network: 'regtest', 
      username: 'leeloo', 
      password: 'multipass', 
      port: 18443 
    })
    hashLatest = await client.getBestBlockHash()
    let block = await client.getBlock(hashLatest)
    timeLatest = block.time
    if(DEBUG){
      dateLatest = new Date(timeLatest*1000)
      console.log("hashLatest", hashLatest)
      console.log("timeLatest", timeLatest)     
      console.log("dateLatest", dateLatest)
    }
  })

  it("latest block is ok", async function() {
    let retrievedTime = await retrieveBlockDate(hashLatest)
    if(DEBUG){
      dateRetrievedTime = new Date(retrievedTime*1000)
      console.log("dateRetrieved", dateRetrievedTime)
    }
    expect(retrievedTime).to.equal(timeLatest)
  })
})