// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ThriftSavings {
    mapping(address => uint256) private balances;

    function contribute() public payable {
        require(msg.value > 0, "Contribution amount must be greater than zero");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(amount > 0, "Withdrawal amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function getBalance(address account) public view returns (uint256) {
        return balances[account];
    }
}
