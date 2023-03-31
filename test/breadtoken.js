// const { assert } = require("chai");

const BreadToken = artifacts.require("BreadToken");

contract("BreadToken", (accounts) => {
  it("matches name successfully", async () => {
    let breadToken = await BreadToken.new();

    const name = await breadToken.name();

    assert.equal(name, "Bread Token");
  });
  it("can mint tokens to an address", async () => {
    const breadToken = await BreadToken.deployed();

    // const balance = await breadToken.balanceOf(accounts[0]);

    const check = await breadToken.mint(accounts[0], 10000);
    const amount = await check.logs[0].args.value.toNumber();

    assert.equal(amount, 10000, "10000 wasn't in the first account");
  });
});
