const { expect } = require("chai")

describe("Token Sale", function() {
  let minito, tosa, owner, alice, bob

  beforeEach(async ()=>{
    const minitoDeployer = await ethers.getContractFactory("MinimalToken")
    const tosaDeployer = await ethers.getContractFactory("TokenSale");

    [owner, alice, bob] = await ethers.getSigners()
    minito = await minitoDeployer.deploy(200)

    tosa = await tosaDeployer.deploy(minito.address, 1000000)
    await minito.deployed()
  })
  it("Deploy account should have 200 units ", async function() {
    expect(await minito.balanceOf(owner.address)).to.equal(200)
  })
  it("Insufficient balance transactions should fail", async function() {
    await expect( minito.transfer(alice.address, 2000)).to.be.reverted
  })
  it("Transfer should change balances", async function() {
    await minito.transfer(alice.address, 15)
    expect(await minito.balanceOf(alice.address)).to.equal(15)
  })
  it("Price should be available and correct", async function() {
    expect(await tosa.getPrice()).to.equal(1000000)
  })
  it("alice buys one tokens", async function() {
    await minito.transfer(tosa.address, 10)
    const overrides = {
      value: "1001001" //ethers.utils.formatUnits(1000000)//, 'wei'),
    }
    await tosa.connect(alice).buy(overrides)
    expect(await minito.balanceOf(alice.address)).to.equal(1)
  })
  it("alice buys 10 tokens", async function() {
    await minito.transfer(tosa.address, 10)
    const overrides = {
      value: "10000000" //ethers.utils.formatUnits(1000000)//, 'wei'),
    }
    await tosa.connect(alice).buy(overrides)
    expect(await minito.balanceOf(alice.address)).to.equal(10)
  })
  it("alice buys more token that available", async function() {
    await minito.transfer(tosa.address, 10)
    const overrides = {
      value: "20000000" //ethers.utils.formatUnits(1000, 'wei'),
    }
    // tosa.connect(alice).buy(overrides)
    // expect(await minito.balanceOf(alice.address)).to.equal(0)

    await expect(tosa.connect(alice).buy(overrides)).to.be.reverted
  })
})
