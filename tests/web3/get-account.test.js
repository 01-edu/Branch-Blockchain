const { expect } = require("chai")

describe("get account", function () {
  const getAccount = require("/jail/student/get-account.js")
  it("Should get the first account", async function () {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
    const accounts = await provider.listAccounts()
    let account = await getAccount()
    expect(account).to.equal(accounts[0])
  })

})
