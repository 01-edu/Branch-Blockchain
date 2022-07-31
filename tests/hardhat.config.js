require("@nomiclabs/hardhat-waffle")

const { TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD } = require("hardhat/builtin-tasks/task-names")
const path = require("path")
const expectedSolcVersion = "0.8.11"

subtask(TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD, async (args, hre, runSuper) => {
    if (args.solcVersion === expectedSolcVersion) {
        // const compilerPath = path.join(__dirname, "solc");
        const compilerPath = path.join("/usr/bin", "solc")

        console.log(">>> Compiler path : ", compilerPath)

        return {
            compilerPath,
            isSolcJs: false, // if you are using a native compiler, set this to false
            version: args.solcVersion,
            // this is used as extra information in the build-info files, but other than
            // that is not important
            longVersion: "solc-linux-v" + expectedSolcVersion
        }
    }
    console.log("Please use version", expectedSolcVersion)
    // we just use the default subtask if the version is not this
    return runSuper()
})

// Ideally sources would be /jail/student. Might be improved XL

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: expectedSolcVersion,

    paths: {
        // root: "/jail",
        sources: "./student",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
}

