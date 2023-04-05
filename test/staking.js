const BreadToken = artifacts.require("BreadToken");
const UGToken = artifacts.require("UGToken");
const Staking = artifacts.require("Staking");
const MockBEP20 = artifacts.require("MockBEP20");
const BN = require("bn.js");

contract("Staking", (accounts) => {
  before(async () => {
    this.breadToken = await BreadToken.deployed();
    this.ugToken = await UGToken.deployed();
    this.staking = await Staking.deployed();
    this.mockBep = await MockBEP20.deployed();
  });

  describe("Staking Contract Tests", async () => {
    it("can create a staking pool", async () => {
      await this.staking.createStakingPool(1, this.mockBep.address);

      assert(
        this.mockBep.address !== this.breadToken.address,
        "Cannot create another bread pool"
      );
    });

    it("can deposit tokens into the pool", async () => {
      //   const res = await this.breadToken.balanceOf(accounts[0]);
      //   console.log("prev balance owner is ", await res.toNumber());
      const check = await this.staking.createStakingPool(
        1,
        this.mockBep.address
      );
      console.log(check);

      await this.ugToken.mint(accounts[2], 1000);
      //   await this.staking.createStakingPool(2, this.mockBep.address);

      let txn = await this.ugToken.approve(this.mockBep.address, 1000, {
        from: accounts[2],
      });
      // console.log("txn: ", txn);

      const resp = await this.ugToken.balanceOf(accounts[2]);
      console.log("current balance owner is ", await resp.toNumber());
      //   await this.ugToken.transferFrom(accounts[0], this.staking, 20);
      //   await this.breadToken.transferFrom(accounts[0], this.staking, 20);
      let tx = await this.staking.depositToken(1, "600", {
        from: accounts[2],
      });

      let receipt = await tx.logs[0].event;
      console.log(receipt);

      assert.equal(receipt, "Deposit");

      const newBalance = new BN(await this.ugToken.balanceOf(accounts[2]));
      console.log("new balance owner is ", newBalance.toString());

      expect(newBalance.toString()).to.equal("400");
    });

    // it("can emit Approval event", async () => {
    //   let txn = await this.breadToken.approve(this.staking.address, 1000, {
    //     from: accounts[0],
    //   });
    //   // console.log("txn: ", txn);
    //   let approvalReceipt = await txn.logs[0].event;

    //   assert.equal(approvalReceipt, "Approval");
    // });

    it("can withdraw tokens from the pool", async () => {
      const res = new BN(await this.ugToken.balanceOf(accounts[0]));
      console.log("prev owner is having", await res.toString());

      const tx = await this.staking.withdrawStakedLPtokens(0, 10, {
        from: accounts[0],
      });
      //   console.log(tx);
      const newBalance = await this.breadToken.balanceOf(accounts[0]);
      console.log("new balance owner is ", newBalance.toNumber());

      expect(newBalance.toNumber()).to.equal(990);
    });
  });
});
