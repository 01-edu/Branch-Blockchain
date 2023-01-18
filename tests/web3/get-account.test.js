const { expect } = require("chai");
const ethers = require("ethers")

describe("get account", function() {
    const getAccount = require("/jail/student/get-account.js")
    it("Should return get the first account", async function() {
      const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");//http://localhost:8545
      const accounts = await provider.listAccounts();
      let account = await getAccount()
      expect(account).to.equal(accounts[0]);
    });

});
