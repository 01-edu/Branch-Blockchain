const { expect } = require("chai")
const getAccount = require("/jail/student/get-account.js")

describe("get account", function () {
  let provider
  before(async function () {
    provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
    await provider.ready
  })
  it("Should get the first account", async function () {
    const accounts = await provider.listAccounts()
    let account = await getAccount()
    expect(account).to.equal(accounts[0])
  })

})
