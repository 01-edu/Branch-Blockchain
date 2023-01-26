const { expect } = require("chai")

describe("Basic Swap", function() {
  let minito, owner, alice, bob
  const INITIAL_SUPPLY = 200

  beforeEach(async ()=>{
    const contractDeployerMinito = await ethers.getContractFactory("UsableToken")
    const contractDeployerBaswa = await ethers.getContractFactory("BasicSwap");
    [owner, alice, bob] = await ethers.getSigners()
    minito = await contractDeployerMinito.deploy(INITIAL_SUPPLY)
    minito2 = await contractDeployerMinito.deploy(INITIAL_SUPPLY)
    baswa = await contractDeployerBaswa.deploy(alice.address, bob.address)
    await minito.deployed()
    await baswa.deployed()
  })
  it("Deploy account should have "+INITIAL_SUPPLY+" units ", async function() {
    expect(await minito.accounts(owner.address)).to.equal(INITIAL_SUPPLY)
  })
  it("Too large transaction should fail", async function() {
    await expect( minito.transfer(alice.address, INITIAL_SUPPLY*10)).to.be.reverted
  })

  it("Alice and Bob can have tokens", async function() {
    await minito.transfer(alice.address, 150)
    await minito2.transfer(bob.address, 150)
    expect(await minito.accounts(alice.address)).to.equal(150) && expect(await minito2.accounts(bob.address)).to.equal(150)
  })
  it("Alice and Bob can swap, Alice has B token", async function() {
    await minito.transfer(alice.address, 199)
    await minito2.transfer(bob.address, 199)

    await minito.connect(alice).approve(baswa.address, 150)
    await minito2.connect(bob).approve(baswa.address, 150)

    await baswa.connect(alice).swap(minito.address, 150, minito2.address, 150)
    expect(await minito2.accounts(alice.address)).to.equal(150)
  })

  it("Alice and Bob can't swap more than they authorised ", async function() {
    await minito.transfer(alice.address, 199)
    await minito2.transfer(bob.address, 199)

    await minito.connect(alice).approve(baswa.address, 150)
    await minito2.connect(bob).approve(baswa.address, 150)

    await expect( baswa.connect(alice).swap(minito.address, 2000, minito2.address, 150)).to.be.reverted
  })

})
