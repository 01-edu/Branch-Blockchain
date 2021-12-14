require("@nomiclabs/hardhat-waffle");

// Ideally sources would be /jail/student. Might be improved XL

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",

  paths: {
    sources: "./student",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

