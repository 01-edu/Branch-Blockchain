const { expect } = require("chai");
const ethers = require("ethers")

describe("sendHash", function() {
  const sh = require('./sendHash.js')
  it("Should return the hash of a word", async function() {
    const provider = new ethers.providers.JsonRpcProvider();//http://localhost:8545
    let txHash = await sh("hello")
    let tx = await provider.getTransaction( txHash ) 
    expect(tx.data).to.equal("0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824");
  });
  it("Should return the hash of a text", async function() {
    const provider = new ethers.providers.JsonRpcProvider();//http://localhost:8545
    let txHash = await sh("Comme je descendais des Fleuves impassibles")
    let tx = await provider.getTransaction( txHash ) 
    expect(tx.data).to.equal("0x654ac81d069e3928d9fed854a2f0889463b054e5f51145dbb68a0a93611d4f65");
  });
  it("Should return the hash of an empty string", async function() {
    const provider = new ethers.providers.JsonRpcProvider();//http://localhost:8545
    let txHash = await sh("")
    let tx = await provider.getTransaction( txHash ) 
    expect(tx.data).to.equal("0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
  });
  it("Should not change significally the sender balance", async function() {
    const provider = new ethers.providers.JsonRpcProvider();//http://localhost:8545
    const signerAddress = await provider.getSigner().getAddress()
    let initialBalance = await provider.getBalance(signerAddress)
    let txHash = await sh("")
    let finalBalance = await provider.getBalance(signerAddress)
    let conv = x => parseInt(ethers.utils.formatUnits(x,"gwei"))
    console.log(conv(initialBalance)-conv(finalBalance))
    expect(conv(initialBalance)-conv(finalBalance)).to.be.at.most(10000000)//0.01 ethers
  });
});
