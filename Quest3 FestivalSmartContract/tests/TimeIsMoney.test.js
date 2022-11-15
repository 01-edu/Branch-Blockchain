const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Time is Money - time aspect", function() { 
  let Festival, orga, attendee, artist
  before( async function () {
    [orga, attendee, artist] = await ethers.getSigners();
    Festival = await ethers.getContractFactory("TimeIsMoney");

  })

  it("5 days before, early bird price fails", async function() {
    let currDate = new Date
    let date = Math.round(currDate.getTime() / 1000 + 86400 * 5) 
    festival = await Festival.deploy(date);
    await festival.deployed();
    const overrides = {
      value:  ethers.utils.parseEther("0.01"),
    }
    await expect(festival.connect(attendee).buyTicket(overrides)).to.be.reverted
  })

  it("1 day after start, artists can't be payed", async function() {
    let currDate = new Date
    let date = Math.round(currDate.getTime() / 1000 - 86400 * 1)
    festival = await Festival.deploy(date);
    await festival.deployed();
    const expValue = ethers.utils.parseEther("33")
    const overrides = {
      value: expValue,
    }
    await festival.connect(attendee).buyTicket(overrides)
    await festival.addPayedArtist(artist.address)
    await expect(festival.connect(artist).getPayed()).to.be.reverted
  })

  it("5 days after start, organizer can't be payed", async function() {
    let currDate = new Date
    let date = Math.round(currDate.getTime() / 1000 - 86400 * 5)
    festival = await Festival.deploy(date);
    await festival.deployed();
    await festival.addPayedArtist(artist.address)
    const expValue = ethers.utils.parseEther("22")
    const overrides = {
      value: expValue,
    }
    await festival.connect(attendee).buyTicket(overrides)
    await festival.connect(artist).getPayed()
    await expect(festival.getBenefits()).to.be.reverted  
  });
})

const PASTDATE = 1010101010 //20020-1-3


describe("Time is Money - late money aspect", function() { 
  let festival, orga, attendee, artist
  beforeEach( async function () {
    const Festival = await ethers.getContractFactory("TimeIsMoney");
    festival = await Festival.deploy(PASTDATE);
    await festival.deployed();
    [orga, attendee, artist] = await ethers.getSigners();
  })

  it("should add an artist", async function() {
    await expect(festival.addPayedArtist(artist.address)).to.not.be.reverted
  })


  it("The artist should get payed ", async function() {
    await festival.addPayedArtist(artist.address)
    const expValue = ethers.utils.parseEther("22")
    const overrides = {
      value: expValue,
    }
    await festival.connect(attendee).buyTicket(overrides)
    await festival.connect(artist).getPayed()
    expect(await orga.provider.getBalance(artist.address)).to.gt(ethers.utils.parseEther("10000"))
  });

  it("Should fail when there are not enough funds", async function() {
    const expValue = ethers.utils.parseEther("0.3")
    const overrides = {
      value: expValue,
    }
    await festival.connect(attendee).buyTicket(overrides)
    await festival.addPayedArtist(artist.address)
    await expect(festival.connect(artist).getPayed()).to.be.reverted
  });
  it("Artist not registered can't be payed", async function() {
    const expValue = ethers.utils.parseEther("23")
    const overrides = {
      value: expValue,
    }
    await festival.connect(attendee).buyTicket(overrides)
    await expect(festival.connect(artist).getPayed()).to.be.reverted
  });
  it("Artist can't be payed twice", async function() {
    const expValue = ethers.utils.parseEther("23")
    const overrides = {
      value: expValue,
    }
    await festival.connect(attendee).buyTicket(overrides)
    await festival.addPayedArtist(artist.address)
    await festival.connect(artist).getPayed()
    await expect(festival.connect(artist).getPayed()).to.be.reverted
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