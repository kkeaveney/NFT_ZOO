const { expect } = require("chai");





describe('RandomNumberConsumer', async () => {
  let randomNumberConsumer, vrfCoordinatorMock, seed

    beforeEach(async () => {
      await deployments.fixture(['mocks', 'vrf'])

      seed = 123
      const LinkToken = await deployments.get('LinkToken')
      linkToken = await ethers.getContract('LinkToken', LinkToken.address)
      
    })

    it('should successfully make an external random number request', async () => {
      console.log(linkToken.address)
    })

})



