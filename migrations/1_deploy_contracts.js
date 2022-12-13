
const Fallback = artifacts.require("Fallback");
const Telephone = artifacts.require("Telephone");
const AttackTelephone = artifacts.require("AttackTelephone");

module.exports = async function(deployer, network, accounts) {
  console.log("accounts: ", accounts);
  console.log("account 1:", accounts[1]);
  await deployer.deploy(Fallback);
  await deployer.deploy(Telephone);
  
  let attack = await deployer.deploy(AttackTelephone, Telephone.address, {from: accounts[1]})
  //deployer.deploy(AttackTelephone, Telephone.address);
  console.log(attack);
  let owner = await attack.contract.methods.owner().call()
  console.log("attack owner: ", owner);
};
