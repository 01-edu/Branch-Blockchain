const { expect } = require("chai")

const {transfersHistory} = require('/jail/student/transfers-history.js')
const mockEventfulCompiled = require('/app/web3/mock-eventful.json')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

describe('Transfers History', function (){
  let eventful
  before(async () => {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");//http://localhost:8545
    [deployer] = await ethers.getSigners()
    const abi = mockEventfulCompiled.abi
    const bytecode = mockEventfulCompiled.bytecode
    const eventfulFactory = await ethers.getContractFactory(abi, bytecode)
    eventful = await eventfulFactory.deploy()
    await eventful.deployed()
  })

  it("Eventful should be deployed", async function() {
    expect(eventful.address).to.not.be.undefined
  })

  it("Alice receives 100 token", async function() {
    const Alice = "0x7A7a4EdC679bC4E29F74E32E9eEDd256cd435FBb"
    const Bob = "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc"
    let res = await eventful.transfer(Bob, Alice, 100)
    await res.wait()
    let transfers = await transfersHistory(eventful.address, Alice)
    expect(transfers[0]).to.be.equal(100)
  })
})