const { expect } = require("chai");
const ethers = require("ethers")

describe("sendEther", function() {
    const sendEther = require('./sendEther.js')
    it("Checking balance", async function() {
      const provider = new ethers.providers.JsonRpcProvider()
      address = "0x7A7a4EdC679bC4E29F74E32E9eEDd256cd435FBb"
      await sendEther(0.01, address)
      let balance = await provider.getBalance(address)
      // Handle multiples 
      expect(0).to.equal(parseInt(ethers.utils.formatEther(balance))%0.01)  
    });

    it("Checking balance", async function() {
      const provider = new ethers.providers.JsonRpcProvider()
      address = "0x7A7a4EdC679bC4E29F74E32E9eEDd256cd435FBb"
      await sendEther(0.01, address)
      let balance = await provider.getBalance(address)
      // Handle multiples 
      expect(0).to.equal(parseInt(ethers.utils.formatEther(balance))%0.01) 
    });

});
