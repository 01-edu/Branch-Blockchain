const { expect } = require("chai");
const ethers = require("ethers")

describe("Check document", function() {
    const sendHash = require("/jail/student/send-hash.js")
    const checkDocument = require("/jail/student/check-document.js")

    it("Should return timestamp on a prior string", async function() {
      const provider = new ethers.providers.JsonRpcProvider();//http://localhost:8545
      let txHash = await sendHash("hello")
      let timestamp = await checkDocument("hello", txHash)
      expect(timestamp).to.be.at.least(1612104837);
    });
    it("Should return 0 for a different string", async function() {
      const provider = new ethers.providers.JsonRpcProvider();//http://localhost:8545
      let txHash = await sendHash("Comme je descendais des Fleuves impassibles")
      let timestamp = await checkDocument("hello", txHash)
      expect(timestamp).to.be.equal(0)
    });
    it("Should return 0 for an incorrect hash", async function() {
      const provider = new ethers.providers.JsonRpcProvider();//http://localhost:8545
      let txHash = await sendHash("Indeed")
      let timestamp = await checkDocument("hello", 0xfc134a6da246ce3f3eb6b2bf4581616c31ba701c87afc60ee3c612593cb27b64)
      expect(timestamp).to.be.equal(0)
    });
    it("Should not change significantly the sender balance", async function() {
      const provider = new ethers.providers.JsonRpcProvider();//http://localhost:8545
      const signerAddress = await provider.getSigner().getAddress()
      let initialBalance = await provider.getBalance(signerAddress)
      let txHash = await sendHash("")
      let finalBalance = await provider.getBalance(signerAddress)
      let conv = x => parseInt(ethers.utils.formatUnits(x,"gwei"))
      expect(conv(initialBalance)-conv(finalBalance)).to.be.at.most(10000000)//0.01 ethers
    });

});
