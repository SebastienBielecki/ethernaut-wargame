const Fallback = artifacts.require("Fallback");
const Web3 = require("web3");
const web3 = new Web3(process.env.LOCAL_PROVIDER)

let fallbackInstance

contract('Fallback', (accounts) => {

  before(async () => {
    await Fallback.deployed();
    fallbackInstance = await new web3.eth.Contract(Fallback.abi, Fallback.address)
  })

//   it('instance is accessible', async () => {
//     //console.log("Fallback abi:", Fallback.abi);
//     console.log("Fallback address:", Fallback.address);
//     console.log("fallback Instance: ", fallbackInstance);
//     });

  it('Owner is account 0', async () => {
    let owner = await fallbackInstance.methods.owner().call()
    assert.equal(owner, accounts[0])
    console.log(fallbackInstance.web3);
  });

  it('Account 1 can contribute 0.0005 ether', async () => {
    await fallbackInstance.methods.contribute().send({from: accounts[1], value: web3.utils.toWei("1", "Gwei")})
    let result = await fallbackInstance.methods.getContribution().call({from: accounts[1]})
    console.log("contribution: ", result);
    assert.equal(result, web3.utils.toWei("1", "Gwei"))
  });

  it('Account 1 send 0.0005 ether to receive function and becomes the owner', async () => {
    console.log("address fallback: ", Fallback.address);
    let contractAddress = Fallback.address
    await web3.eth.sendTransaction({from: accounts[1], to: Fallback.address, value: web3.utils.toWei("1", "Gwei")})
    owner = await fallbackInstance.methods.owner().call()
    assert.equal(owner, accounts[1])
  });


  
});
