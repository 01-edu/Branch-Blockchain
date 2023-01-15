const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fun and profit ", function() { 
  let festival, deployed, orga, attendee
  beforeEach( async function () {
    const Festival = await ethers.getContractFactory("FunAndProfit");
    festival = await Festival.deploy();
    deployed = await festival.deployed();
    [orga, attendee, artist] = await ethers.getSigners();
  })

  it("Should have a buyTicket and a ticketsOf functions", async function() {
    expect(deployed.functions).to.have.own.property('buyTicket') && expect(deployed.functions).to.have.own.property('ticketsOf')
  });

  it("Should buy a ticket", async function() {
    const overrides = {
      value: ethers.utils.parseEther("0.1"),
    }
    await festival.connect(attendee).buyTicket(overrides)
    expect(await festival.ticketsOf(attendee.address)).to.equal(1); 
  });

  it("Should reject buy offer below price", async function() {
    const overrides = {
      value: ethers.utils.parseEther("0.05"),
    }
    await expect(festival.connect(attendee).buyTicket(overrides)).to.be.reverted;
  });

  it("The organizer should be payed", async function() {
    const expValue = ethers.utils.parseEther("22")
    const overrides = {
      value: expValue,
    }
    await festival.connect(attendee).buyTicket(overrides)
    await festival.connect(orga).getBenefits()
    expect(await orga.provider.getBalance(orga.address)).to.gt(ethers.utils.parseEther("10000"))
  });

  it("The contract should be emptied", async function() {
    const expValue = ethers.utils.parseEther("22")
    const overrides = {
      value: expValue,
    }
    await festival.connect(attendee).buyTicket(overrides)
    await festival.connect(orga).getBenefits()
    expect(await orga.provider.getBalance(festival.address)).to.equal(ethers.utils.parseEther("0"))
 
  });
});