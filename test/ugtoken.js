// const { assert } = require("chai");

const UGToken = artifacts.require("UGToken");

contract("UGToken", (accounts) => {
  before(async () => {
    this.ugToken = await UGToken.new();
  });

  it("matches name successfully", async () => {
    const name = await this.ugToken.name();

    assert.equal(name, "UGToken");
  });

  it("can mint tokens to an address", async () => {
    const check = await this.ugToken.mint(accounts[0], 10000);
    const amount = await check.logs[0].args.value.toNumber();

    assert.equal(amount, 10000, "10000 wasn't in the first account");
  });
  it("can verify that the owner is the zero address", async () => {
    const owner = await this.ugToken.owner();
    console.log(owner, accounts[0]);

    assert.equal(owner, accounts[0], "Owner is not address at Zero index");
  });
  // it("can verify that the balanceOf owner is the totalSupply of minted tokens", async () => {
  //   console.log(this.ugToken);
  //   const balanceOf = await this.ugToken.balanceOf(accounts[0]);
  //   console.log(balanceOf.toNumber());
  //   assert.equal(balanceOf.toString(), "10000000", "Balance is not equal");
  // });
  it("can transfer tokens to another address", async () => {
    await this.ugToken.transfer(accounts[2], 3000);
    const A = await this.ugToken.balanceOf(accounts[2]);
    assert.equal(A.toNumber(), 3000, "The Transferred amount is not 30000");
  });
  it("can approve another address to spend its tokens", async () => {
    await this.ugToken.approve(accounts[0], 300, { from: accounts[2] });
    await this.ugToken.transferFrom(accounts[2], accounts[1], 300);

    const newA = await this.ugToken.balanceOf(accounts[2]);
    assert.equal(newA.toNumber(), 2700, "The Balance is not 2700");
  });
  it("can transfer from index2 account to any other account", async () => {
    await this.ugToken.transfer(accounts[1], 300, { from: accounts[2] });
    const B = await this.ugToken.balanceOf(accounts[1]);

    assert.equal(B.toNumber(), 600, "Balance is not equal to 600");
  });
});
