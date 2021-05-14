const { ethers } = require("ethers");
const { task } = require("hardhat/config");

task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners()
    for (const account in accounts) {
        console.log(account.address)
    }
})

module.exports = {}