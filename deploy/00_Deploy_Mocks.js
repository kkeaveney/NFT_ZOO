module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const DECIMALS = '18'
    const INITIAL_PRICE = '200000000000000000000'
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()
}