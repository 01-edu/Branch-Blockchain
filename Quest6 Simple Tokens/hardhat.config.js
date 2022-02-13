require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  solidity: "0.8.4",
  // defaultNetwork:"localhost",
  // networks: {
  //   hardhat: {
  //   },
  //   localhost: {
  //     url: "http://localhost:8545",
  //   }
  // },
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  // gasReporter: {
  //   currency: '$',
  //   gasPrice: 1
  // }
};

