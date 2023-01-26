// require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("@nomicfoundation/hardhat-chai-matchers")

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


// TOCHECK Contract compiling from the contract folder is a hack due to unexpected duplicates (see entrypoint)
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: expectedSolcVersion,

  paths: {
    root: "/jail",
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 10000,
    parallel: true
  }
}