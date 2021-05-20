let { networkConfig } = require('../helper-hardhat-config')


module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId
}) => {
  const { deploy, get, log } = deployments
  const { deployer, owner } = await getNamedAccounts()
  const chainId = await getChainId()
  let linkTokenAddress
  let vrfCoordinatorAddress
  let additionalMessage = ""

  if (chainId == 31337) {
    linkToken = await get('LinkToken')
    VRFCoordinatorMock = await get('VRFCoordinatorMock')
    linkTokenAddress = linkToken.address
    vrfCoordinatorAddress = VRFCoordinatorMock.address
    additionalMessage = " --linkaddress " + linkTokenAddress
  } else {
    linkTokenAddress = networkConfig[chainId]['linkToken']
    vrfCoordinatorAddress = networkConfig[chainId]['vrfCoordinator']
  }
  const keyHash = networkConfig[chainId]['keyHash']

  const baseNFT = await deploy('BaseNFT', {
      from: deployer
  })

  const coreNFT = await deploy('CoreNFT', {
    from: deployer,
    args: [vrfCoordinatorAddress, linkTokenAddress, keyHash],
    log: true
  })

  
  log("Run the following command to fund contract with LINK:")
  log("npx hardhat fund-link --contract " + baseNFT.address + " --network " + networkConfig[chainId]['name'] + additionalMessage)
  log("npx hardhat fund-link --contract " + coreNFT.address + " --network " + networkConfig[chainId]['name'] + additionalMessage)
  log("Then run BaseNFT contract with the following command, replacing '777' with your chosen seed number:")
  log("npx hardhat request-random-number --contract " + baseNFT.address, " --seed '777'" + " --network " + networkConfig[chainId]['name'])
  log("----------------------------------------------------")
}

module.exports.tags = ['all', 'vrf']