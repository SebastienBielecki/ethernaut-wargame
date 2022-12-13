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

The vulnerability is that in this contract the fallback function receive() can trigger a change of ownership.
The way to trigger the receive() fallback function is to send Ether to the contract address, with the web3.eth.sendTransaction for instance.

**Key Security Takeaways**
- If you implement a fallback function, keep it simple
- Fallback functions should not be used to change contract ownership, transfer funds, support low-level function calls, and more.






