# Ethernaut hacking exercises

The Ethernaut is a Web3/Solidity based wargame inspired by overthewire.org, played in the Ethereum Virtual Machine. Each level is a smart contract that needs to be 'hacked'.

The wargame url is: https://ethernaut.openzeppelin.com/

## Requirement
Node.js, truffle
clone the repository and npm install

## How to use it
Check for the vulnerable contracts in the "contract" folder
The way to hack the contract is implemented in the test folder
To hack the contract, simply enter truffle test test/(testFile) in the command line
example: truffle test test/1.Fallback.js

## 1. Fallback

https://ethernaut.openzeppelin.com/level/0x80934BE6B8B872B364b470Ca30EaAd8AEAC4f63F

The vulnerability in this contract is that the fallback function receive() can trigger a change of ownership.
The way to trigger the receive() fallback function is to send Ether to the contract address, with the web3.eth.sendTransaction for instance.

Test it by running
`truffle test test/1.Fallback.js`

## 4. Telephone

https://ethernaut.openzeppelin.com/level/0x1ca9f1c518ec5681C2B7F97c7385C0164c3A22Fe

The vulnerability in this contract is that a change of ownership can be triggered if tx.origin is different from msg.sender.
msg.sender is the entity that is calling directly the function, whether it is an externally owned account (EOA) or a smart contract.
tx.origin is the entity that initiated a call, it can be only an EOA. The initial call can trigger a chain of smart contracts, the tx.origin will keep the same. 
The way to take ownership of this contract is to implement an attack smart contract, that will call the changeOwner function of the Telephone contract.

Test it by running
`truffle test test/4.Telephone.js`

## 7. Force

https://ethernaut.openzeppelin.com/level/0x46f79002907a025599f355A04A512A6Fd45E671B

How can we send Ether to a contract that has no fallback() or receive() function? In this case, any ether sent to the contract will trigger a revert()

In this example, the Force contract is an empty contract.

In order to send Ether to the Force contract, one possibility is to create an attack contract, feed the attack contract with some Ethers, and implement a selfdestruct function. The selfdestruct will send any Ether in the attackcontract to the specified address (selfdestruct accepts one parameters which is the address to send the funds to).

Test it by running
`truffle test test/7.Force.js`

## King

https://ethernaut.openzeppelin.com/level/0x725595BA16E76ED1F6cC1e1b65A88365cC494824

We are asked to become king of the contract, and do not let anyone else become king.
We can see in the King contract than in order to become king, the payment to the previpous king should be succesfull.
We cannot prevent an EAO to receive fund... but we can prevent a smart contract from receiving funds (expect in the 7.force scenario above).
So the way to hack the King contract is to create an attack smart contract (AttackKing), the will become king of the King contract. The AttackKing contract will not implement a fallbak function to receive Ethers, so any Ether send to this smart contract will revert, and so nobody to reclaim kingship of the king contract.

Test it by running 
`truffle test test/7.King.js`

