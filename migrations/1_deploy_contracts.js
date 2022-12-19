
const Fallback = artifacts.require("Fallback");
const Telephone = artifacts.require("Telephone");
const AttackTelephone = artifacts.require("AttackTelephone");
const Force = artifacts.require("Force")
const AttackForce = artifacts.require("AttackForce")
const King = artifacts.require("King")
const AttackKing = artifacts.require("AttackKing")
const Reentrance = artifacts.require("Reentrance")
const AttackReentrance = artifacts.require("AttackReentrance")
const Vault = artifacts.require("Vault")

module.exports = async function(deployer, network, accounts) {

  // await deployer.deploy(Fallback);
  // await deployer.deploy(Telephone);
  
  // let attack = await deployer.deploy(AttackTelephone, Telephone.address, {from: accounts[1]})
  // deployer.deploy(AttackTelephone, Telephone.address);
  // let owner = await attack.contract.methods.owner().call()

  // await deployer.deploy(Force)
  // await deployer.deploy(AttackForce, Force.address)
  // await deployer.deploy(King, {from: accounts[0], value: web3.utils.toWei("1", "finney")})
  // await deployer.deploy(AttackKing, King.address, {from: accounts[1]})
  // await deployer.deploy(Reentrance, {from: accounts[0]})
  // await deployer.deploy(AttackReentrance, Reentrance.address, {from: accounts[1]})
  const password = web3.utils.asciiToHex("Test1234")
  console.log(password);
  await deployer.deploy(Vault, password)
};
