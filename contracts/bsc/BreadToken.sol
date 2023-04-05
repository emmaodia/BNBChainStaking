// SPDX-License-Identifier: GPL-3

// pragma solidity ^0.6.0;

// import "@pancakeswap/pancake-swap-lib/contracts/token/BEP20/BEP20.sol";

// contract BreadToken is BEP20("Bread Token", "BREAD") {
//     function mint(address _to, uint256 _amount) public onlyOwner {
//         _to = msg.sender;
//         _mint(_to, _amount);
//     }
// }

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BreadToken is ERC20 {
    uint256 public balance;
    address public owner;

    constructor(uint256 _initialsupply) ERC20("Bread Token", "BREAD") {
        owner = msg.sender;
        _mint(owner, _initialsupply);
    }

    function viewSupply() public returns (uint256) {
        balance = owner.balance;
        return balance;
    }
}
