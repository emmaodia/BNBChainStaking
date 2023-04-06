const BreadToken = artifacts.require("BreadToken");
const MockERC20 = artifacts.require("MockERC20");
const UGToken = artifacts.require("UGToken");
const Staking = artifacts.require("Staking");

module.exports = function (deployer) {
  deployer.deploy(BreadToken, "10000");
  deployer.deploy(MockERC20);
  deployer.deploy(UGToken).then(function () {
    return deployer.deploy(
      Staking,
      UGToken.address,
      BreadToken.address,
      1000,
      1
    );
  });
};
