const { expect } = require("chai")

describe("Artists do work", function() { 
  let festival, orga, attendee, artist
  beforeEach( async function () {
    const Festival = await ethers.getContractFactory("ArtistsDoWork")
    festival = await Festival.deploy()
    await festival.deployed();
    [orga, attendee, artist] = await ethers.getSigners()
  })

  it("should add an artist", async function() {
    await expect(festival.addRemuneratedArtist(artist.address)).to.not.be.reverted
  })

  it("anyone but the organizer can add an artist", async function() {
    await expect(festival.connect(artist).addRemuneratedArtist(artist.address)).to.be.reverted
  })

  it("The artist should get payed ", async function() {
    await festival.addRemuneratedArtist(artist.address)
    const expValue = ethers.utils.parseEther("22")
    const overrides = {
      value: expValue,
    }
    await festival.connect(attendee).buyTicket(overrides)
    await festival.connect(artist).getPayed()
    expect(await orga.provider.getBalance(artist.address)).to.gt(ethers.utils.parseEther("10000"))
  })

  it("There are not enough funds", async function() {
    const expValue = ethers.utils.parseEther("0.3")
    const overrides = {
      value: expValue,
    }
    await festival.connect(attendee).buyTicket(overrides)
    await festival.addRemuneratedArtist(artist.address)
    await expect(festival.connect(artist).getPayed()).to.be.reverted
  })
  it("Artist not registered", async function() {
    const expValue = ethers.utils.parseEther("23")
    const overrides = {
      value: expValue,
    }
    await festival.connect(attendee).buyTicket(overrides)
    await expect(festival.connect(artist).getPayed()).to.be.reverted
  })
  it("Artist got payed twice", async function() {
    const expValue = ethers.utils.parseEther("23")
    const overrides = {
      value: expValue,
    }
    await festival.connect(attendee).buyTicket(overrides)
    await festival.addRemuneratedArtist(artist.address)
    await festival.connect(artist).getPayed()
    await expect(festival.connect(artist).getPayed()).to.be.reverted
  })
})