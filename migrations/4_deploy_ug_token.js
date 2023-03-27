const UGToken = artifacts.require("UGToken");

module.exports = function (deployer) {
  deployer.deploy(UGToken);
};
