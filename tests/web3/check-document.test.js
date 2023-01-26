const { expect } = require("chai")

const crypto = require("crypto")

describe("Check document", function() {
  // const sendHash = require("/jail/student/send-hash.js")
  let provider
  before(async function() {
    provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")//http://localhost:8545
    await provider.ready
  })
    
  async function sendHash(entry) {
    let entryBuffer  = Buffer.from(entry)
    let hash = crypto.createHash("sha256").update(entryBuffer).digest("hex")
    const signer = provider.getSigner()
    const tx = await signer.sendTransaction({
      to: "0x7A7a4EdC679bC4E29F74E32E9eEDd256cd435FBb",
      value: ethers.utils.parseEther("0"),
      data: '0x'+ hash 
    })
    await tx.wait()
    return tx.hash
  } 
  const checkDocument = require("/jail/student/check-document.js")

  it("Should return timestamp on a prior string", async function() {
    let txHash = await sendHash("hello")
    let timestamp = await checkDocument("hello", txHash)
    expect(timestamp).to.be.at.least(1612104837)
  })
  it("Should return 0 for a different string", async function() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")//http://localhost:8545
    let txHash = await sendHash("Comme je descendais des Fleuves impassibles")
    let timestamp = await checkDocument("hello", txHash)
    expect(timestamp).to.be.equal(0)
  })
  it("Should return 0 for an incorrect hash", async function() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")//http://localhost:8545
    let txHash = await sendHash("Indeed")
    let timestamp = await checkDocument("hello", 0xfc134a6da246ce3f3eb6b2bf4581616c31ba701c87afc60ee3c612593cb27b64)
    expect(timestamp).to.be.equal(0)
  })
  it("Should not change significantly the sender balance", async function() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")//http://localhost:8545
    const signerAddress = await provider.getSigner().getAddress()
    let initialBalance = await provider.getBalance(signerAddress)
    let txHash = await sendHash("")
    let finalBalance = await provider.getBalance(signerAddress)
    let conv = x => parseInt(ethers.utils.formatUnits(x,"gwei"))
    expect(conv(initialBalance)-conv(finalBalance)).to.be.at.most(10000000)//0.01 ethers
  })

})
