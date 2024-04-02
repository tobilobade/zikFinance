
const connectContract = async () => {
    const ABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "FundToppedUp",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Purchase",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "purchaseTicket",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "topUpFunds",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Withdrawal",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "withdrawTicketFunds",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "withdrawUserFunds",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getContractBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getOwner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "getUserTopUpBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "userBalances",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const Address = "0x6af55c49055f56dc48afb7a9e182e5a6eb32c7f0"; // Taking Address from Remix 
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    document.getElementById("contractArea").innerHTML = "Ready to Transact";
    document.getElementById("connect-button").style = "background:green; color:white";
    document.getElementById("connect-button").innerHTML = "CONNECTED";  // calling the elementID above
}

// Function to get the contract balance for ticket purchase
const getContractBalance = async () => {
    try {
        const data = await window.contract.methods.getContractBalance().call();
        const balanceInEther = web3.utils.fromWei(data, 'ether');
        document.getElementById("contractBalance").innerHTML = `Contract Balance (Ticket Purchase): ${balanceInEther} Sep`;
    } catch (error) {
        console.error('Error getting contract balance:', error);
        // Handle error
    }
}


// Function to get dsa balance
const getTopUpBalance = async () => {
    try {
        const userAddress = account; // Use the connected address from MetaMask
        const data = await window.contract.methods.getUserTopUpBalance(userAddress).call();
        const balanceInEther = window.web3.utils.fromWei(data, 'ether');
        document.getElementById("topUpBalance").innerHTML = `Top-Up Balance: ${balanceInEther} Sepolia`;
    } catch (error) {
        console.error('Error getting top-up balance:', error);
        // Handle error
    }
}


// Function to withdraw from contract funds by owner
const withdraw = async () => {
    const amountInEther = document.getElementById("amountInput").value;
    const amountInWei = web3.utils.toWei(amountInEther, 'ether');
    const address = document.getElementById("addressInput").value;
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        await window.contract.methods.withdrawTicketFunds(address, amountInWei).send({ from: account });
    } catch (error) {
        console.error('Error withdrawing funds:', error);
        // Handle error
    }
}

// Function to top up dsa balance
const topUpContract = async () => {
    const amountInEther = parseFloat(document.getElementById("topUpInput").value);
    const amountInWei = web3.utils.toWei(amountInEther.toString(), 'ether');
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        await window.contract.methods.topUpFunds().send({ from: account, value: amountInWei });
    } catch (error) {
        console.error('Error topping up contract:', error);
        // Handle error
    }
}

// Function to withdraw top-up funds by users
const withdrawUserFunds = async () => {
    const amountInEther = document.getElementById("withdrawAmountInput").value;
    const amountInWei = web3.utils.toWei(amountInEther, 'ether');
    const withdrawalAddress = document.getElementById("withdrawAddressInput").value;
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        await window.contract.methods.withdrawUserFunds(withdrawalAddress, amountInWei).send({ from: account });
    } catch (error) {
        console.error('Error withdrawing funds:', error);
        // Handle error
    }
}
