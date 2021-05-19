const { expect } = require('chai');


describe('Simple NFT', async function () {
    let baseNFT
    let accounts
    let owner
    let tokenURI='https://ipfs.io/ipfs/QmTgqnhFBMkfT9s8PHKcdXBn1f5bG3Q5hmBaR4U6hoTvb1?filename=Chainlink_Elf.png'
    
    
    beforeEach(async () => {
        await deployments.fixture(['mocks', 'vrf'])
        accounts = await ethers.getSigners();
        owner = accounts[0]
        const BaseNFT = await deployments.get('BaseNFT')
        baseNFT = await ethers.getContractAt('BaseNFT', BaseNFT.address)
    })

    it('creates collectable', async () => {
        await baseNFT.createCollectible(tokenURI)
        // First NFT is minted
        expect(await baseNFT.tokenCounter()).to.eq(1)
        // Confirm NFT owner
        expect(await baseNFT.ownerOf(0)).to.eq(owner.address)
        // Number of NFTs owned by address
        expect(await baseNFT.balanceOf(owner.address)).to.eq(1)
        // Confirm name and symbol
        expect(await baseNFT.name()).to.equal('GOOD_LOOKING')
        expect(await baseNFT.symbol()).to.equal('GLR')
        // TokenURI metadata
        expect(await baseNFT.tokenURI(0)).to.eq(tokenURI)
    })
})