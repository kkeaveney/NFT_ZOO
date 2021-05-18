const { expect } = require('chai')
describe('Simple NFT', async () => {
    let baseNFT
    beforeEach(async () => {
        await deployments.fixture(['mocks', 'vrf'])
    
        
        const BaseNFT = await deployments.get('SimpleCollectable')
        baseNFT = await ethers.getContractAt('SimpleCollectable', BaseNFT.address)
    })

    it('confirms deployment', async () => {
        console.log(baseNFT.address)
    })
})