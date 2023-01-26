const { expect } = require("chai")

describe("Usable token (Allowances)", function() {
  let minito, owner, alice, bob

  beforeEach(async ()=>{
    const contractDeployer = await ethers.getContractFactory("UsableToken");
    [owner, alice, bob] = await ethers.getSigners()
    minito = await contractDeployer.deploy(200)
    await minito.deployed()
  })
  it("Deploy account should have 200 units ", async function() {
    expect(await minito.accounts(owner.address)).to.equal(200)
  })

  it("Too large transaction should fail", async function() {
    await expect( minito.transfer(alice.address, 2000)).to.be.reverted
  })
  it("Transfer should change balances", async function() {
    await minito.transfer(alice.address, 150)
    expect(await minito.accounts(alice.address)).to.equal(150)

  })

  it("Owner can approve and allowance corresponds", async function() {
    await minito.approve(alice.address, 23)
    expect(await minito.allowance(owner.address, alice.address)).to.equal(23)
  })

  it("Too large transferFrom should fail", async function() {
    await minito.approve(bob.address, 23)

    await expect( minito.connect(bob).transferFrom(owner.address, alice.address, 2000)).to.be.reverted
  })

})
