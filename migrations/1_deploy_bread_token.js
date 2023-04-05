const BreadToken = artifacts.require("BreadToken");
const UGToken = artifacts.require("UGToken");
const Staking = artifacts.require("Staking");

module.exports = function (deployer) {
  deployer.deploy(BreadToken, "10000");
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
