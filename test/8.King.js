const King = artifacts.require("King");
const AttackKing = artifacts.require("AttackKing");


let kingInstance
let attackKingInstance

contract('King', (accounts) => {

  before(async () => {
    kingInstance = await King.deployed()
    attackKingInstance = await AttackKing.deployed()
  })

  it('Sanity check', async () => {
    console.log("King instance: ", kingInstance);
    console.log("AttackKing instance: ", attackKingInstance);
  });

  it('owner, prize and king of King contract are correct', async () => {
    let owner = await kingInstance.owner()
    assert.equal(owner, accounts[0])
    let prize = await kingInstance.prize()
    prize = prize.toNumber()
    assert.equal(prize, web3.utils.toWei("1", "finney"))
    let king = await kingInstance._king()
    assert.equal(king, accounts[0])
  });

  it('owner, prize and king of King contract are correct', async () => {
    let owner = await kingInstance.owner()
    assert.equal(owner, accounts[0])
    let prize = await kingInstance.prize()
    prize = prize.toNumber()
    assert.equal(prize, web3.utils.toWei("1", "finney"))
    let king = await kingInstance._king()
    assert.equal(king, accounts[0])
  });

  it('trigger sendFundskingContract function from AttackKing', async () => {

    await attackKingInstance.sendFundsKingContract({from: accounts[1], value: web3.utils.toWei("2", "finney")})
    // check new King in King contract is the Attackking smart contract, and prize is 2 Finneys
    let king = await kingInstance._king()
    assert.equal(king, AttackKing.address)
    let prize = await kingInstance.prize()
    prize = prize.toNumber()
    assert.equal(prize, web3.utils.toWei("2", "finney"))

  });

  it('original King owner cannot be king again', async () => {
    try {
        await web3.eth.sendTransaction({from: accounts[0], to: King.address, value: web3.utils.toWei("3", "finney")})
        assert.equal(true, false, "Uh uh transaction should not be succesfull")
    } catch (error) {
        assert.equal(true, true)
    }
    let king = await kingInstance._king()
    assert.equal(king, AttackKing.address, "AttackKing smart contract is not King anymore")

  });


  
});
