const { expect } = require('chai')
const { parseEther, id } = require("ethers/lib/utils")






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
        const VRFCoordinatorMock = await deployments.get('VRFCoordinatorMock')
        vrfCoordinatorMock = await ethers.getContractAt('VRFCoordinatorMock', VRFCoordinatorMock.address)
    })

    it('creates collectible', async () => {
        let res = await coreNFT.createCollectible(tokenURI, 3442)
        expect(await coreNFT.tokenCounter()).to.eq(0)
        
    })
    it('emits a requestCollectible event', async () => {
        let res = await coreNFT.createCollectible(tokenURI, 12)
        // Get requestId from emitted event
        let receipt = await res.wait();
        let events = receipt.events.filter((x) => {return x.event == "RequestCollectible"});
        let requestId = events[0].args['requestId']
        
        vrfCoordinatorMock.callBackWithRandomness(
            requestId, 31337, coreNFT.address, {"from": owner.address}
        )

        expect(await coreNFT.tokenCounter()).to.eq(0)
    })
})

