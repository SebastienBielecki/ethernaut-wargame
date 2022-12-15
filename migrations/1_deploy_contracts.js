
const Fallback = artifacts.require("Fallback");
const Telephone = artifacts.require("Telephone");
const AttackTelephone = artifacts.require("AttackTelephone");
const Force = artifacts.require("Force")
const AttackForce = artifacts.require("AttackForce")
const King = artifacts.require("King")
const AttackKing = artifacts.require("AttackKing")

module.exports = async function(deployer, network, accounts) {
  //console.log("accounts: ", accounts);
  //console.log("account 1:", accounts[1]);
  await deployer.deploy(Fallback);
  await deployer.deploy(Telephone);
  
  let attack = await deployer.deploy(AttackTelephone, Telephone.address, {from: accounts[1]})
  deployer.deploy(AttackTelephone, Telephone.address);
  //console.log(attack);
  let owner = await attack.contract.methods.owner().call()
  //console.log("attack owner: ", owner);

  await deployer.deploy(Force)
  await deployer.deploy(AttackForce, Force.address)
  await deployer.deploy(King, {from: accounts[0], value: web3.utils.toWei("1", "finney")})
  await deployer.deploy(AttackKing, King.address, {from: accounts[1]})
};
