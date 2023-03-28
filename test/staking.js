const BreadToken = artifacts.require("BreadToken");
const UGToken = artifacts.require("UGToken");
const Staking = artifacts.require("Staking");
const MockBEP20 = artifacts.require("MockBEP20");

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

    it("can deposit token into the pool", async () => {
      const res = await this.breadToken.balanceOf(accounts[0]);
      console.log("prev balance owner is ", await res.toNumber());

      await this.breadToken.mint(accounts[0], 1000);
      await this.staking.createStakingPool(1, this.breadToken.address);

      let txn = await this.breadToken.approve(this.staking.address, 1000, {
        from: accounts[0],
      });
      // console.log("txn: ", txn);
      let approvalReceipt = await txn.logs[0].event;
      console.log(approvalReceipt);

      assert.equal(approvalReceipt, "Approval");

      // await this.stakeToken.deposit(0, amount);
      const excessValue = "300"; // 10000000000000000000
      const resp = await this.breadToken.balanceOf(accounts[0]);
      console.log("current balance owner is ", await resp.toNumber());
      let tx = await this.staking.depositToken(1, "20", {
        from: accounts[0],
      });

      let receipt = await tx.logs[0].event;
      console.log(receipt);

      assert.equal(receipt, "Deposit");

      const newBalance = await this.breadToken.balanceOf(accounts[0]);
      console.log("new balance owner is ", newBalance.toNumber());

      expect(newBalance.toNumber()).to.equal(980);
    });

    it("can emit Approval event", async () => {
      let txn = await this.breadToken.approve(this.staking.address, 1000, {
        from: accounts[0],
      });
      // console.log("txn: ", txn);
      let approvalReceipt = await txn.logs[0].event;

      assert.equal(approvalReceipt, "Approval");
    });

    it("can withdraw tokens from the pool", async () => {
      const res = await this.breadToken.balanceOf(accounts[0]);
      console.log("prev balance owner is ", await res.toNumber());

      const tx = await this.staking.withdrawStakedLPtokens(1, 10, {
        from: accounts[0],
      });
      console.log(tx);
      const newBalance = await this.breadToken.balanceOf(accounts[0]);
      console.log("new balance owner is ", newBalance.toNumber());

      expect(newBalance.toNumber()).to.equal(990);
    });
  });
});
