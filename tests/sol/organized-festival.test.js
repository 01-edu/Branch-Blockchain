const { expect } = require("chai");
const { ethers } = require("hardhat");

const FUTUREDATE = 1814936827 // 2027-7-7 07:07:07
describe("OrganizedFestival", function() {
  let festival, orga, attendee

  before( async function () {
    Festival = await ethers.getContractFactory("OrganizedFestival");
    [orga, attendee] = await ethers.getSigners();
  })

  beforeEach( async function () {
  })

  it("Should deploy with correct parameters", async function() {
    await expect(Festival.deploy(FUTUREDATE, "Sziget")).not.be.reverted
  });

  it("Should not deploy with inverted parameters", async function() {
    await expect(Festival.deploy("Sziget", FUTUREDATE)).to.be.reverted;
  });

  it("Should have a getStartTime and a getPlace functions", async function() {
    let festival = await Festival.deploy(FUTUREDATE, "Sziget")
    let deployed = await festival.deployed()
    let fns = deployed.functions
    expect(fns).to.have.own.property('getStartTime') && expect(fns).to.have.own.property('getPlace')
  });

  it("Should have an updateStartTime and an updatePlace functions", async function() {
    let festival = await Festival.deploy(FUTUREDATE, "Sziget")
    let deployed = await festival.deployed()
    expect(deployed.functions).to.have.own.property('updateStartTime') &&  expect(deployed.functions).to.have.own.property('updatePlace')
  });

  it("Should return the correct place after update", async function() {
    let festival = await Festival.deploy(FUTUREDATE, "Sziget")
    await festival.updatePlace('ATL')
    let place = await festival.getPlace()
    expect(place).to.equal('ATL')
  });

  it("Should be return the correct time after update", async function() {
    let festival = await Festival.deploy(FUTUREDATE, "Sziget")
    const RANDOMDATE = Math.round( Math.random() * FUTUREDATE)
    await festival.updateStartTime(RANDOMDATE)
    let startTime = await festival.getStartTime()
    expect(startTime).to.equal(RANDOMDATE)
  });

  it("Should not update the place with another user", async function() {
    let festival = await Festival.deploy(FUTUREDATE, "Sziget")
    await expect(festival.connect(attendee).updatePlace("ATL")).to.be.reverted;
  });

  it("Should not update the starttime with another user", async function() {
    let festival = await Festival.deploy(FUTUREDATE, "Sziget")
    await expect(festival.connect(attendee).updateStartTime(FUTUREDATE+100)).to.be.reverted;

  });
  
});
