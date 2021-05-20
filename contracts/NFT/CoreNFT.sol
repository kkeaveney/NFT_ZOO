pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract CoreNFT is ERC721, VRFConsumerBase {
    uint256 public tokenCounter;
    enum Breed { PUG, SHIBA_INU, BRENARD }
    
    mapping (bytes32 => address) requestIdToSender;
    mapping (bytes32 => string) requestIdToTokenURI;
    mapping (uint256 => Breed) tokenIdtoBreed;
    mapping (bytes32 => uint256) public requestIdToTokenId;
    mapping (address => bytes32) senderToRequestId;
    event RequestCollectible(bytes32 indexed requestId);

    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyHash) 
    public VRFConsumerBase(_VRFCoordinator, _LinkToken)
    ERC721("Doogie", "Dog")
    {
        tokenCounter = 0;
        keyHash = _keyHash;
        fee = 0.1 * 10 ** 18;
    }

    function createCollectible(string memory tokenURI, uint256 userProvidedSeed)
        public returns (bytes32) {
            bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
            requestIdToSender[requestId] = msg.sender;
            requestIdToTokenURI[requestId] = tokenURI;
            emit RequestCollectible(requestId);
            
        }
    
    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        address dogOwner = requestIdToSender[requestId];
        string memory tokenURI = requestIdToTokenURI[requestId];
        uint256 newItemId = tokenCounter;
        _safeMint(dogOwner, newItemId);
        _setTokenURI(newItemId, tokenURI);
        Breed breed = Breed(randomNumber % 3);
        tokenIdtoBreed[newItemId] = breed;
    }

    

}