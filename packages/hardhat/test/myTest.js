const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("My Dapp", function () {
  let myContract;

  describe("YourContract", function () {
    it("Should deploy YourContract", async function () {
      const zooContract = await ethers.getContractFactory("Zoo");
      const colletableContract = await ethers.getContractFactory("Collectable");
      Zoo = await zooContract.deploy();
      Collectable = await colletableContract.deploy();
    });
    it('mints a collectable', async () => {
      //await Collectable.createCollectible();
    })
  });
});
