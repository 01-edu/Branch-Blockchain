const { expect } = require("chai")

describe("Eventful token", function() {
  let minito, owner, alice, bob
  const INITIAL_SUPPLY = 200

  beforeEach(async ()=>{
    const contractDeployer = await ethers.getContractFactory("EventfulToken");
    [owner, alice, bob] = await ethers.getSigners()
    minito = await contractDeployer.deploy(INITIAL_SUPPLY)
    await minito.deployed()
  })
  it("Deploy account should have 200 units ", async function() {
    expect(await minito.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY)
  })
  it("Minting event should be visible", async function() {
    let events = await minito.queryFilter( 'Minting')// [ , fromBlockOrBlockHash [ , toBlock ] ) )
    expect(await events[0].args.recipient).to.equal(owner.address)
    expect(await events[0].args.amount).to.equal(INITIAL_SUPPLY)

  })
  it("Too large transaction should fail", async function() {
    await expect( minito.transfer(alice.address, 2000)).to.be.reverted
  })
  it("Transfer should change balances", async function() {
    await minito.transfer(alice.address, 150)

    expect(await minito.balanceOf(alice.address)).to.equal(150)

  })
  it("Transfer event should be visible", async function() {
    await minito.transfer(alice.address, 150)
    let events = await minito.queryFilter( 'Transfer')// [ , fromBlockOrBlockHash [ , toBlock ] ) )
    let arg0 =  events[0].args
    expect(arg0.sender).to.equal(owner.address) && expect(arg0.recipient).to.equal(alice.address) && expect(arg0.amount).to.equal(150)

  })
  it("Minting event should be visible", async function() {
    let events = await minito.queryFilter( 'Minting')
    let arg0 =  events[0].args
    expect(arg0.recipient).to.equal(owner.address) && expect(arg0.amount).to.equal(INITIAL_SUPPLY)

  })
  
  
})
