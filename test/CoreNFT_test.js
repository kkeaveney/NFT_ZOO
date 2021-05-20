const { expect } = require('chai')
const { parseEther } = require("ethers/lib/utils")






describe('CoreNFT', async function () {
    let coreNFT
    let linkToken
    let accounts
    let result
    let owner
    let tokenURI = 'https://ipfs.io/ipfs/QmTgqnhFBMkfT9s8PHKcdXBn1f5bG3Q5hmBaR4U6hoTvb1?filename=Chainlink_Elf.png'
    
    beforeEach(async () => {
        await deployments.fixture()
        accounts = await ethers.getSigners()
        owner = accounts[0];
        const LinkToken = await deployments.get('LinkToken')
        linkToken = await ethers.getContractAt('LinkToken', LinkToken.address)
        const CoreNFT = await deployments.get('CoreNFT')
        coreNFT = await ethers.getContractAt('CoreNFT', CoreNFT.address);
        await linkToken.transfer(coreNFT.address, parseEther('100'))
    })

    it('creates collectible', async () => {
        let res = await coreNFT.createCollectible(tokenURI, 3442)
        let receipt = await res.wait();
        let event = receipt.events.filter((x) => {return x.event == "RequestCollectible"});
        let reqId = event[0].args['requestId']
    })

    it('emits a requestCollectible event', async () => {
        // result = await expect(coreNFT.createCollectible(tokenURI, 12))
        // .to.emit(coreNFT, 'requestCollectible')
        // .withArgs('0x0f38113053df00d8687b4e22506fcd3247e3bf5ea9f4330c1e30c0fb9a621814')
        
        
    })
})