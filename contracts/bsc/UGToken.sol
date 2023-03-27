// SPDX-License-Identifier: GPL-3

pragma solidity ^0.6.0;

import "@pancakeswap/pancake-swap-lib/contracts/token/BEP20/BEP20.sol";

contract UGToken is BEP20("UGToken", "UGT") {
    function mint(address _to, uint256 _amount) public onlyOwner {
        _to = msg.sender;
        _mint(_to, _amount);
    }
}
