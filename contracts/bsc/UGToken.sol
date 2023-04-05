// SPDX-License-Identifier: GPL-3

// pragma solidity ^0.6.0;

// import "@pancakeswap/pancake-swap-lib/contracts/token/BEP20/BEP20.sol";

// contract UGToken is BEP20("UGToken", "UGT") {
//     function mint(address _to, uint256 _amount) public onlyOwner {
//         _to = msg.sender;
//         _mint(_to, _amount);
//     }
// }

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UGToken is ERC20, ERC20Burnable, Ownable {
    mapping(address => mapping(address => uint256)) private _allowances;

    constructor() ERC20("UGToken", "UGT") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
