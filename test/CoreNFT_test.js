const { expect } = require('chai')




describe('CoreNFT', async function () {
    let coreNFT
    let accounts
    let owner
    let tokenURI = 'https://ipfs.io/ipfs/QmTgqnhFBMkfT9s8PHKcdXBn1f5bG3Q5hmBaR4U6hoTvb1?filename=Chainlink_Elf.png'

    beforeEach(async () => {
        await deployments.fixture()
        accounts = await ethers.getSigners()
        owner = accounts[0];
        const CoreNFT = await deployments.get('CoreNFT')
        coreNFT = await ethers.getContractAt('CoreNFT', CoreNFT.address);
    })

    it('creates collectible', async () => {
         await coreNFT.createCollectible(tokenURI, 0)
        //await ethers.getBalance(coreNFT.address)
        
    })

})