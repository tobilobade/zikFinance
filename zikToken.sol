// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DonationToken is ERC20 {
    constructor() ERC20("zikToken", "ZF") {
        _mint(msg.sender, 100 * 10 ** uint(decimals())); // Mint 100 tokens initially
    }
    
    function decimals() public view virtual override returns (uint8) {
        return 2; // Set the number of decimals to 2
    }

    function donate() external payable {
        // Define your desired token amount per donation (adjust as needed)
        uint256 tokenAmount = 1; // 1 token per donation

        // Mint tokens to the donor directly
        _mint(msg.sender, tokenAmount * 10 ** uint(decimals()));

        // Emit an event indicating the donation
        emit Transfer(address(0), msg.sender, tokenAmount * 10 ** uint(decimals()));
    }
}
