const { expect } = require("chai");
const { ethers } = require("hardhat");

// For optimisation, as it is mostly checks, tests on the same instance
describe("Festival Name", function() {
  let Festival, festival, deployed

  before( async function () {
    Festival = await ethers.getContractFactory("NamedFestival");
  })

  it("Should deploy", async function() {
    festival = await Festival.deploy();
    deployed = await festival.deployed()
    expect(deployed.hasOwnProperty("deployTransaction")).to.be.true
  });

  it("Should have an getName function", async function() {
    expect(deployed.functions.hasOwnProperty("getName")).to.be.true
  });

  it("Should have an setName function", async function() {
    expect(deployed.functions.hasOwnProperty("setName")).to.be.true
  });

  it("Should be able to set a name ", async function() {
    let response = await festival.setName("Sziget mundo!");
    let receipt = await response.wait()
    expect(receipt.status).to.equal(1);
  });

  it("Should change name and return new one", async function() {
    await festival.setName("Sziget mundo2!");
    expect(await festival.getName()).to.equal("Sziget mundo2!");
  });
});