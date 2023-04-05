// const { assert } = require("chai");

const BreadToken = artifacts.require("BreadToken");

contract("BreadToken", (accounts) => {
  before(async () => {
    this.breadToken = await BreadToken.new(10000);
  });

  it("matches name successfully", async () => {
    const name = await this.breadToken.name();

    assert.equal(name, "Bread Token");
  });
  it("can verify that the owner is the zero address", async () => {
    // const breadToken = await BreadToken.deployed();
    const owner = await this.breadToken.owner();
    console.log(owner, accounts[0]);
    // const balance = await breadToken.balanceOf(accounts[0]);

    // const check = await breadToken.mint(accounts[0], 10000);
    // const amount = await check.logs[0].args.value.toNumber();

    assert.equal(owner, accounts[0], "Owner is not address at Zero index");
  });
  it("can verify that the balanceOf owner is the totalSupply of minted tokens", async () => {
    // const breadToken = await BreadToken.deployed();
    // console.log(breadToken);
    const balanceOf = await this.breadToken.balanceOf(accounts[0]);
    console.log(balanceOf.toNumber());
    assert.equal(balanceOf.toNumber(), 10000, "Balance is not equal");
  });
  it("can transfer tokens to another address", async () => {
    // const breadToken = await BreadToken.deployed();
    // console.log(breadToken);
    await this.breadToken.transfer(accounts[2], 3000);
    const A = await this.breadToken.balanceOf(accounts[2]);
    console.log(A.toNumber());
    assert.equal(A.toNumber(), 3000, "The Transferred amount is not 30000");
  });
  it("can approve another address to spend its tokens", async () => {
    await this.breadToken.approve(accounts[0], 300, { from: accounts[2] });
    await this.breadToken.transferFrom(accounts[2], accounts[1], 300);

    const newA = await this.breadToken.balanceOf(accounts[2]);
    console.log(newA.toNumber());
    assert.equal(newA.toNumber(), 2700, "The Balance is not 2700");
  });
  it("can transfer from index2 account to any other account", async () => {
    await this.breadToken.transfer(accounts[1], 300, { from: accounts[2] });
    const B = await this.breadToken.balanceOf(accounts[1]);
    console.log(B.toNumber());

    assert.equal(B.toNumber(), 600, "Balance is not equal to 600");
  });
});
