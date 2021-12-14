require("@nomiclabs/hardhat-waffle");

const { TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD } = require("hardhat/builtin-tasks/task-names");
const path = require("path");

subtask(TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD, async (args, hre, runSuper) => {
  if (args.solcVersion === "0.8.10") {
    const compilerPath = path.join(__dirname, "solc");
     
    return {
      compilerPath,
      isSolcJs: true, // if you are using a native compiler, set this to false
      version: args.solcVersion,
      // this is used as extra information in the build-info files, but other than
      // that is not important
      longVersion: "solc-linux-amd64-v0.8.10"
    }
  }

  // we just use the default subtask if the version is not 0.8.5
  return runSuper();
})

// Ideally sources would be /jail/student. Might be improved XL

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.10",

  paths: {
    sources: "./student",
    tests: "./",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

