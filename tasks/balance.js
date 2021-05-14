task("balance", "Prints an accounts balance")
    .addParam("account", "The accounts address")
    .setAction(async taskArgs => {
        const account = web3.utils.toChecksumAddress(taskArgs.account)
        const balance = await web3.eth.getBalance(account)
        console.log(web3.utils.fromWei(balance, "ether", "ETH"))
    })

    module.exports = {}