const BreadToken = artifacts.require("BreadToken");

module.exports = function (deployer) {
  deployer.deploy(BreadToken);
};
