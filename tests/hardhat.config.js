// require("@nomiclabs/hardhat-waffle")
// Relies on package.json:
// "@nomiclabs/hardhat-waffle": "^2.0.3",
require("@nomiclabs/hardhat-ethers")
// Relies on package.json:
// "@nomiclabs/hardhat-ethers": "^2.2.2",
require("@nomicfoundation/hardhat-chai-matchers")
// Relies on package.json(incompatible with waffle)
// "@nomicfoundation/hardhat-chai-matchers": "^1.0.5",

const { TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD } = require("hardhat/builtin-tasks/task-names")
const path = require("path")
const expectedSolcVersion = "0.8.17"

// Subtask to use solc that hash been downloaded from the ppa instead of a downloaded version
subtask(TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD, async (args, hre, runSuper) => {
  if (args.solcVersion === expectedSolcVersion) {
    // const compilerPath = path.join(__dirname, "solc");
    const compilerPath = path.join("/usr/bin", "solc")
    // console.log(">>> Compiler path : ", compilerPath) // Uncomment to debug compiler path location 

    return {
      compilerPath,
      isSolcJs: false, // if you are using a native compiler, set this to false
      version: args.solcVersion,
      // this is used as extra information in the build-info files
      longVersion: "solc-linux-v" + expectedSolcVersion
    }
  }
  console.log("Please use version", expectedSolcVersion)
  // we just use the default subtask if the version is not this
  return runSuper()
})


/**
 * @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
  solidity: expectedSolcVersion,

  paths: {
    root: "/jail",
    sources: "./contracts",
    // Compiling from the ./contract folder instead of ./student is to prevent duplicates (see entrypoint)
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 10000,
    parallel: true
  }
}