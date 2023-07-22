// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Memories is ERC721URIStorage {
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

  constructor() ERC721("Memories", "MEM") {}
  // calldata is read only, use for funct inputs as params
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

}