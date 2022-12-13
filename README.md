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

## 4. Telephone

https://ethernaut.openzeppelin.com/level/0x1ca9f1c518ec5681C2B7F97c7385C0164c3A22Fe

The vulnerability in this contract is that a change of ownership can be triggered if tx.origin is different from msg.sender.
msg.sender is the entity that is calling directly the function, whether it is an externally owned account (EOA) or a smart contract.
tx.origin is the entity that initiated a call, it can be only an EOA. The initial call can trigger a chain of smart contracts, the tx.origin will keep the same. 
The way to take ownership of this contract is to implement an attack smart contract, that will call the changeOwner function of the Telephone contract.