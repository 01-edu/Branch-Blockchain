const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Festival Buy Ticket", function() {
  let festival, deployed, orga, attendee
  // For optimisation we only deploy once
  before( async function () {
    const Festival = await ethers.getContractFactory("BuyTickets");
    festival = await Festival.deploy();
    deployed = await festival.deployed();
    [orga, attendee] = await ethers.getSigners();
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
  it("Should accept excess amount", async function() {
    const overrides = {
      value: ethers.utils.parseEther("1"),
    }
    await festival.connect(attendee).buyTicket(overrides)
    expect(await festival.ticketsOf(attendee.address)).to.equal(2); 
  });

});
