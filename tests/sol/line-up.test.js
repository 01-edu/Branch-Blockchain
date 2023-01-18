const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Festival LineUp", function() {
  let Festival, festival, owner, attendee
  before( async function () {
    Festival = await ethers.getContractFactory("Lineup");
  })
  it("Should deploy ", async function() {
    await expect(Festival.deploy()).to.not.be.reverted
  });
  it("Should have an addArtist function", async function() {
    let festival = await Festival.deploy()
    let deployed = await festival.deployed()
    expect(deployed.functions.hasOwnProperty("addArtist")).to.be.true
  });
  it("Should have an lineup function", async function() {
    let festival = await Festival.deploy()
    let deployed = await festival.deployed()
    expect(deployed.functions.hasOwnProperty("lineup")).to.be.true
  });
  it("Should add one artist ", async function() {
    festival = await Festival.deploy();
    await festival.deployed();
    await festival.addArtist("BoZo");
    expect(await festival.lineup(0)).to.equal("BoZo");
  });
  it("Should add two artists", async function() {
    festival = await Festival.deploy();
    await festival.deployed();
    await festival.addArtist("BoZo");
    await festival.addArtist("21 titans");
    expect(await festival.lineup(1)).to.equal("21 titans");
  });
});
