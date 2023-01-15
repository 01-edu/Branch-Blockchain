const { expect } = require("chai");
const { ethers } = require("hardhat");

const FUTUREDATE = 1814936827 // 2027-7-7 07:07:07

describe("Time and Place", function() {
  let Festival

  before( async function () {
    Festival = await ethers.getContractFactory("TimeAndPlace");
  })

  it("Should deploy with correct parameters", async function() {
    await expect(Festival.deploy(FUTUREDATE, "Sziget")).not.be.reverted
  });

  it("Should not deploy with inverted parameters", async function() {
    await expect(Festival.deploy("Sziget", FUTUREDATE)).to.be.reverted;
  });

  it("Should have an getStartTime function", async function() {
    let festival = await Festival.deploy(FUTUREDATE, "Sziget")
    let deployed = await festival.deployed()
    expect(deployed.functions.hasOwnProperty("getStartTime")).to.be.true
  });

  it("Should have an getPlace function", async function() {
    let festival = await Festival.deploy(FUTUREDATE, "Sziget")
    let deployed = await festival.deployed()
    expect(deployed.functions.hasOwnProperty("getPlace")).to.be.true
  });

  it("Should be return the correct place ", async function() {
    let festival = await Festival.deploy(FUTUREDATE, "Sziget")
    let place = await festival.getPlace()
    expect(place).to.equal('Sziget')
  });

  it("Should be return the correct time ", async function() {
    const RANDOMDATE = Math.round( Math.random() * FUTUREDATE)
    let festival = await Festival.deploy(RANDOMDATE, "Sziget")
    let startTime = await festival.getStartTime()
    expect(startTime).to.equal(RANDOMDATE)
  });
});