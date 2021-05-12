const { expect } = require("chai");
const { constants} = require('ethers');


describe('Setup', () => {
  let linkTokenAddress;
  let collectables;
  let vRFConsumerBase;
  let addrs;
  let keyHash;
  beforeEach(async () => {
    [owner, addrs1, ...addrs] = await ethers.getSigners();
    let VRFConsumerBase = await ethers.getContractAt("VRFConsumerBase");
    vRFConsumerBase = await VRFConsumerBase.deploy()
    //
    let Collectables = await ethers.getContractFactory("AdvancedCollectable");
    collectables = await Collectables.deploy(vRFConsumerBase, addrs1, keyHash);
  })
  describe("Greeter", function() {
    it("Should return the new greeting once it's changed", async function() {
      
      
      console.log(collectables);
      
    });
  });
})



