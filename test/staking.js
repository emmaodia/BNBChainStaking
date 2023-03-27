const BreadToken = artifacts.require("BreadToken");
const UGToken = artifacts.require("UGToken");
const Staking = artifacts.require("Staking");
const MockBEP20 = artifacts.require("MockBEP20");

contract("Staking", (account) => {
  beforeEach(async () => {
    this.breadToken = await BreadToken.deployed();
    this.ugToken = await UGToken.deployed();
    this.staking = await Staking.deployed();
    this.mockBep = await MockBEP20.deployed();
  });

  it("can create a staking pool", async () => {
    await this.staking.createStakingPool(1, this.mockBep.address);

    assert(
      this.mockBep.address !== this.breadToken.address,
      "Cannot create another bread pool"
    );
  });

  it("can deposit token into the pool", async () => {
    console.log(
      "prev balance owner is ",
      await this.breadToken.balanceOf(account[0])
    );

    const ownerPreviousBalance = await this.breadToken.balanceOf(account[0]); // //deposit
    await this.staking.createStakingPool(1, this.breadToken.address);

    const amount = "1000";

    console.log("amount ", amount);

    let txn = await this.breadToken.approve(this.staking.address, amount, {
      from: account[0],
    });
    console.log("txn: ", txn);
    // await this.stakeToken.deposit(0, amount);
    const excessValue = "300"; // 10000000000000000000
    let tx = await this.staking.depositToken(0, "20", {
      from: account[0],
    });

    let receipt = await tx.wait();
    console.log(
      "event: ",
      receipt.events?.filter((x) => {
        return x.event == "Deposit";
      })
    );

    console.log(
      "new balance owner is ",
      await this.breadToken.balanceOf(account[0])
    );
    expect(await this.breadToken.balanceOf(account[0])).to.equal(
      "999999999999999999999980"
    );
  });
});
