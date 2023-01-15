const { expect } = require("chai")

describe("Minimal Token", function() {
  let minito, owner, alice, bob

  beforeEach(async ()=>{
    const contractDeployer = await ethers.getContractFactory("MinimalToken");
    [owner, alice, bob] = await ethers.getSigners();
    minito = await contractDeployer.deploy(200);
    await minito.deployed();
  })
  it("Deploy account should have 200 units ", async function() {
    expect(await minito.balanceOf(owner.address)).to.equal(200)
  });
  it("Too large transaction should fail", async function() {
      await expect( minito.transfer(alice.address, 2000)).to.be.reverted
  });
  it("Transfer should change balances", async function() {
    await minito.transfer(alice.address, 150)
    expect(await minito.balanceOf(alice.address)).to.equal(150)
  });
  it("Subsequent transfers transitivity ", async function() {
    await minito.transfer(alice.address, 50)
    await minito.connect(alice).transfer(bob.address, 50)
    expect(await minito.balanceOf(bob.address)).to.equal(50)
  });
})
