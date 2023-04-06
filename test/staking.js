const BreadToken = artifacts.require("BreadToken");
const UGToken = artifacts.require("UGToken");
const Staking = artifacts.require("Staking");
const MockERC20 = artifacts.require("MockERC20");
const BN = require("bn.js");

contract("Staking", (accounts) => {
  before(async () => {
    this.breadToken = await BreadToken.deployed();
    this.ugToken = await UGToken.deployed();
    this.staking = await Staking.deployed();
    this.mockBep = await MockERC20.deployed();
    this.lp1 = await MockERC20.deployed();
  });

  describe("Staking Contract Tests", async () => {
    it("can create a staking pool", async () => {
      await this.staking.createStakingPool(1, this.ugToken.address);

      assert(
        this.ugToken.address !== this.breadToken.address,
        "Cannot create another bread pool"
      );
    });

    it("can deposit tokens into a pool", async () => {
      await this.ugToken.mint(accounts[2], 1000);

      await this.ugToken.approve(this.staking.address, 1000, {
        from: accounts[2],
      });

      await this.ugToken.balanceOf(accounts[2]);

      await this.staking.createStakingPool(1, this.ugToken.address);
      const tx = await this.staking.depositToken(1, "600", {
        from: accounts[2],
      });

      let receipt = await tx.logs[0].event;

      assert.equal(receipt, "Deposit");

      const newBalance = new BN(await this.ugToken.balanceOf(accounts[2]));

      expect(newBalance.toString()).to.equal("400");
    });

    it("can emit Approval event", async () => {
      let txn = await this.breadToken.approve(this.staking.address, 1000, {
        from: accounts[0],
      });

      let approvalReceipt = await txn.logs[0].event;

      assert.equal(approvalReceipt, "Approval");
    });

    it("can withdraw tokens from the pool", async () => {
      await this.staking.withdrawStakedLPtokens(1, "50", {
        from: accounts[2],
      });

      const newBalance = await this.ugToken.balanceOf(accounts[2]);

      expect(newBalance.toNumber()).to.equal(450);
    });
  });
});
