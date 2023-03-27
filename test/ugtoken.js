// const { assert } = require("chai");

const UGToken = artifacts.require("UGToken");

contract("UGToken", (accounts) => {
  it("can mint tokens to an address", async () => {
    const ugtoken = await UGToken.deployed();

    const check = await ugtoken.mint(accounts[0], 10000);
    const amount = await check.logs[0].args.value.toNumber();

    assert.equal(amount, 10000, "10000 wasn't in the first account");
  });
});
