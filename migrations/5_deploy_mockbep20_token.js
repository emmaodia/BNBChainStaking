const MockBEP20 = artifacts.require("MockBEP20");

module.exports = function (deployer) {
  deployer.deploy(MockBEP20, "name", "symbol", 10000);
};
