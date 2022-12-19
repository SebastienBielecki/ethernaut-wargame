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

## 8. King

https://ethernaut.openzeppelin.com/level/0x725595BA16E76ED1F6cC1e1b65A88365cC494824

We are asked to become king of the "King" contract, and do not let anyone else become king.
We can see in the King contract than in order to become king, the payment to the previous king should be succesfull.
We cannot prevent an EAO (Externally Owned Account) from receiving fund... but we can prevent a smart contract from receiving funds (expect in the 7.force scenario above).
So the way to hack the King contract is to create an attack smart contract (AttackKing), that will become king of the King contract. The AttackKing contract will not implement a fallbak function to receive Ethers, so any Ether sent to this smart contract will revert, and so nobody can reclaim kingship of the king contract.

Key takeaway: never assume a transaction will be succesfull

Test it by running 
`truffle test test/8.King.js`

## 9. Reentrancy

https://ethernaut.openzeppelin.com/level/0x573eAaf1C1c2521e671534FAA525fAAf0894eCEb

This contract is vulnerable to re-entrancy attack, because:
- we never know if we are sending a transaction to a smart contract or an EOA.
- if the recipient is a smart contract, the smart contract can trigger some logic through the receive() function.
- in the vulnerable contract, the check-effects-interaction pattern is NOT implemented, e.g. the transaction is sent, and only after, the balance is adjusted. It should be the reverse. this makes the contract vulnerable to a re-entrancy attack.
So in order to hack the contract, we need to:
- create an attack contract
- the attack contract will send some funds to the vulnerable contract, in order to get a positive balance
- the attack contract will trigger the withdraw function from the culnerable contract
- when the attack contract, receives funds, the receive() fallback function will request another withdraw. Since the balance of the attack smart contract has not been debited yet, the vulnerable contract will accept another withdraw... and so on, until the vulnerable contract balance gets to 0

Test it by running 
`truffle test test/9.Reentrance.js`

## Vault

This ones shows that even if a state variable is declared as private, it can be easily accessed, as the state variable are stored in the storage slots of the smart contract and can be accessed by anybody.

In this case the password is stored in slot 1, so it is easuly access via a call to the web3.eht.getStorageAt method, passing the Vault contract address and the slot number as parameters.

Test it by running 
`truffle test test/8.Vault.js