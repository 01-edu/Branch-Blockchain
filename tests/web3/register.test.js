const { expect } = require("chai");
const { ethers } = require("hardhat");

const DOCHASH = "0x37741ec14d337e77ec4fe2d33be71f2e8aa9d858b5982ab9faf5aebfc6350aea"
const WRONGDOCHASH = "0x17741ec14d337e77ec4fe2d33be71f2e8aa9d858b5982ab9faf5aebfc6350aea"

const REFDATE = 1609459200
describe("Register smart contrat", function() {
  let register = {}
  beforeEach( async function () {
    const RegisterFactory = await ethers.getContractFactory("Register");
    register = await RegisterFactory.deploy();
    await register.deployed()
  })
  it("Should return date of a document added", async function() {
    await register.addDocument(DOCHASH)
    expect(await register.getDate(DOCHASH)).to.be.at.least(REFDATE)
  });
  it("Should have a consistent date", async function() {
    await register.addDocument(DOCHASH)
    let initDate = await register.getDate(DOCHASH)
    await register.addDocument(WRONGDOCHASH)
    await register.addDocument(ANOTHERHASH)
    let lastDate = await register.getDate(DOCHASH)
    expect(initDate).to.be.equal(lastDate)
  });
  it("Should return 0 for a document not added", async function() {
    expect(await register.getDate(WRONGDOCHASH)).to.be.equal(0)
  });
});
