pragma solidity >=0.6.6 <=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/dev/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Characters is ERC721, VRFConsumerBase, Ownable {

    struct Character {
        uint256 strength;
        uint256 dexterity;
        uint256 constitution;
        uint256 intelligence;
        uint256 wisdom;
        uint256 charisma;
        uint256 experience;
        string name;
    }

    Character[] public characters;

    bytes32 internal keyHash;
    uint256 internal fee;

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash) 
    VRFConsumerBase(_VRFCoordinator, _LinkToken)
    ERC721("Character", "CHR")
    {
        keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }

    function requestNewRandomCharacter(uint256 userProvidedSeed,string memory name) 
        public returns (bytes32) {
            require(
                LINK.balanceOf(address(this)) >= fee, "Not enough LINK"
            );
        
        bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
        requestToCharacterName[requestId] = name;
        requestToSender[requestId] = msg.sender;
        return requestId;
    }
}