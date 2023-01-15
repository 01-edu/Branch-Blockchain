const { expect } = require("chai")
const {transfersHistory} = require('./transfersHistory.sl.js');

// const fs = require('fs');
// try {
//     let data = fs.readFileSync('History.sl.js', 'utf8');
//     console.log(data);    
//     //  eval(data)
// } catch(e) {
//     console.log('Error:', e.stack);
// }



describe("Transfer History", function() {
  let minito, owner, alice, bob

  beforeEach(async ()=>{
    // let provider = new ethers.providers.JsonRpcProvider()   
    const contractDeployer = await ethers.getContractFactory("EventfulToken");
    [owner, alice, bob] = await ethers.getSigners();
    minito = await contractDeployer.deploy(200);
    await minito.deployed();
  })
  it("Deploy account should have 200 units ", async function() {
    expect(await minito.balanceOf(owner.address)).to.equal(200)
  });
  it("Mint event should be visible", async function() {
    let events = await minito.queryFilter( 'Minting')// [ , fromBlockOrBlockHash [ , toBlock ] ) )
    expect(await events[0].args.recipient).to.equal(owner.address)
    expect(await events[0].args.amount).to.equal(200)

  });

  it("Transfer should change balances", async function() {
    await minito.transfer(alice.address, 150)
    expect(await minito.balanceOf(alice.address)).to.equal(150)

  });
  it("Transfer History of owner  should be accurate", async function() {
    await minito.transfer(alice.address, 150)
    await minito.transfer(alice.address, 12)
    let ownerHistory = await transfersHistory(minito.address,owner.address)
    expect(ownerHistory).to.eql([ -150, -12 ])

  });
  it("Transfer History of alice should be accurate", async function() {
    await minito.transfer(alice.address, 150)
    await minito.connect(alice).transfer(bob.address, 44)
    let aliceHistory = await transfersHistory(minito.address,alice.address)
    expect(aliceHistory).to.eql([ 150, -44 ])

  });
})