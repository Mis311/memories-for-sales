// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ByteHasher } from './helpers/ByteHasher.sol';
import { IWorldID } from './interfaces/IWorldID.sol';


/// @notice Thrown when attempting to reuse a nullifier
error InvalidNullifier();

/// @dev The address of the World ID Router contract that will be used for verifying proofs
IWorldID internal immutable worldId;

/// @dev The keccak256 hash of the externalNullifier (unique identifier of the action performed), combination of appId and action
uint256 internal immutable externalNullifierHash;

/// @dev The World ID group ID (1 for Orb-verified, 0 for Phone-verified)
uint256 internal immutable groupId = 1;

/// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
mapping(uint256 => bool) internal nullifierHashes;

/// @param _worldId The WorldID instance that will verify the proofs
/// @param _appId The World ID app ID
/// @param _actionId The World ID action ID


constructor(
  ERC721("Memories", "MEM"),
    IWorldID _worldId,
    string memory _appId,
    string memory _action
) {

  worldId = _worldId;
  externalNullifierHash = abi
        .encodePacked(abi.encodePacked(_appId).hashToField(), _action)
        .hashToField();


 /// @param signal An arbitrary input from the user that cannot be tampered with. In this case, it is the user's wallet address.
/// @param root The root (returned by the IDKit widget).
/// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the IDKit widget).
/// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the IDKit widget).
using Counters for Counters.Counter;
  Counters.Counter public _totalNFTs;
  uint public _totalContributions = 0;
  mapping(uint => Contribution) public contributionList;
  struct Contribution {
    uint id;
    string cid;
    address author;
  }

  event ContributionCreated (
    uint id,
    string cid,
    address organizer
  );

function verifyAndExecute(
    address signal,
    uint256 root,
    uint256 nullifierHash,
    uint256[8] calldata proof
) public {
    // First, we make sure this person hasn't done this before
    if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

    // We now verify the provided proof is valid and the user is verified by World ID
    worldId.verifyProof(
        root,
        groupId, // set to "1"
        abi.encodePacked(signal).hashToField(),
        nullifierHash,
        externalNullifierHash,
        proof
    );

    // We now record the user has done this, so they can't do it again (sybil-resistance)
    nullifierHashes[nullifierHash] = true;

    // Finally, execute your logic here, knowing the user is verified
}

 function createContribution(string calldata _cid) public {
    contributionList[_totalContributions] = Contribution(_totalContributions, _cid, msg.sender);
    emit ContributionCreated(_totalContributions,_cid, msg.sender);
    _totalContributions++;
  }


  function getAllContributions() public view returns (Contribution[] memory) {
      Contribution[] memory contributionArray = new Contribution[](_totalContributions);
      for (uint i = 0; i < _totalContributions; i++) {
          Contribution storage currentItem = contributionList[i];
          contributionArray[i] = currentItem;
      }
      return contributionArray;
  }

     function addReviev() public view returns (Contribution[] memory) {
      Contribution[] memory contributionList = new Contribution[](_totalContributions);
       allContributions["review"] = Contribution( _cid,);
       emit ContributionCreated(allContributions,_cid);
    _totalContributions++;
      return class;
  }

  // cancels a flow
    function stopFlowWhenCritical(address sender, address receiver) external onlyRole(DEFAULT_ADMIN_ROLE) {
        cfaV1Lib.deleteFlowByOperator(sender, receiver, ISuperfluidToken(superToken));
        emit DeletedFlow(sender, receiver);
    }
}



