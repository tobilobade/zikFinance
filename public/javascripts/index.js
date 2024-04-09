let web3;
let thriftSavingsContract;
let account;
let futureBalanceInterval; 

const connectMetamask = async () => {
  if(window.ethereum !== "undefined") {
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      account = accounts[0];
      const truncatedAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`; // Truncate the address
      document.getElementById("userArea").innerHTML = `${truncatedAddress}`;
      document.getElementById("userArea").style = 'color:#05FF00';
  }
}


// Function to connect MetaMask and initialize contract
async function connectMetamaskAndInitializeContract() {
  try {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
          // Request MetaMask accounts
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          account = accounts[0];
          document.getElementById("userArea").innerHTML = `(Active): ${account}`;
          document.getElementById("userArea").style = 'color:#05FF00';

          // Initialize Web3 with MetaMask provider
          web3 = new Web3(window.ethereum);

          // Contract address and ABI
          const contractAddress = '0x51c6ec16bf9685f7679f3895d6b08bf8f03c5de6';
          const contractABI = [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "groupOwner",
                  "type": "address"
                }
              ],
              "name": "contribute",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "string[]",
                  "name": "friendNames",
                  "type": "string[]"
                },
                {
                  "internalType": "address[]",
                  "name": "friendAddresses",
                  "type": "address[]"
                }
              ],
              "name": "createGroup",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "groupOwner",
                  "type": "address"
                }
              ],
              "name": "distributeFunds",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "groupOwner",
                  "type": "address"
                }
              ],
              "name": "joinGroup",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "groupOwner",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "member",
                  "type": "address"
                }
              ],
              "name": "getBalance",
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
              "inputs": [
                {
                  "internalType": "address",
                  "name": "groupOwner",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "member",
                  "type": "address"
                }
              ],
              "name": "getFriendAddress",
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
                  "name": "groupOwner",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "member",
                  "type": "address"
                }
              ],
              "name": "getFriendName",
              "outputs": [
                {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "groupOwnerAddress",
                  "type": "address"
                }
              ],
              "name": "getGroupDetails",
              "outputs": [
                {
                  "internalType": "address[]",
                  "name": "",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "",
                  "type": "uint256[]"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            }
          ]; 
          // Initialize contract instance
          thriftSavingsContract = new web3.eth.Contract(contractABI, contractAddress);
          alert('Contract initialized successfully');
      } else {
          console.error('MetaMask is not installed.');
      }
  } catch (error) {
      console.error('Error connecting MetaMask and initializing contract:', error);
  }
}



const contractAddress = '0xae1ee0f0be3f83d3b5c3bfe65f6bb3f00825aa8c';
const contractABI = [
	{
		"inputs": [],
		"name": "contribute",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getBalance",
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
]; // Replace with your contract ABI



async function initialize() {
    // Initialize Web3
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        console.error('MetaMask is not installed.');
        return;
    }

    // Initialize contract instance
    thriftSavingsContract = new web3.eth.Contract(contractABI, contractAddress);

    // Display user balance
    await displayBalance();
    startFutureBalanceInterval();
    displaySavedWithdrawalDate(); 

}

async function contribute() {
  const amount = document.getElementById('contributionAmount').value;
  if (!amount) {
      alert('Please enter a contribution amount');
      return;
  }
  const withdrawalDate = document.getElementById('withdrawalDate').value; // Retrieve withdrawal date
  if (!withdrawalDate) {
      alert('Please select a withdrawal date');
      return;
  }

  saveWithdrawalDate();

  const amountInWei = web3.utils.toWei(amount, 'ether'); // Convert Ether to wei
  const accounts = await web3.eth.getAccounts();
  const from = accounts[0]; // Get the first account from MetaMask

  await thriftSavingsContract.methods.contribute().send({ from, value: amountInWei });
  await displayBalance();
}

async function withdraw() {
  const amount = document.getElementById('withdrawalAmount').value;
  if (!amount) {
      alert('Please enter a withdrawal amount');
      return;
  }

  const amountInWei = web3.utils.toWei(amount, 'ether'); // Convert withdrawal amount to Wei
  const accounts = await web3.eth.getAccounts();
  const sender = accounts[0]; // Get the first account from MetaMask
  await thriftSavingsContract.methods.withdraw(amountInWei).send({ from: sender });
  await displayBalance();
}

async function displayBalance() {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const balance = await thriftSavingsContract.methods.getBalance(account).call();
    document.getElementById('balance').innerText = `Your balance: ${web3.utils.fromWei(balance, 'ether')} ETH`;
}

function saveWithdrawalDate() {
  const withdrawalDate = document.getElementById('withdrawalDate').value;
  localStorage.setItem('withdrawalDate', withdrawalDate);
}

// Function to retrieve selected withdrawal date from local storage
function getWithdrawalDate() {
  savedWithdrawalDate= localStorage.getItem('withdrawalDate');
  return savedWithdrawalDate
  
}


async function startFutureBalanceInterval() {
  futureBalanceInterval = setInterval(async () => {
      await displayFutureBalance();
  }, 20000); 
}

async function stopFutureBalanceInterval() {
  clearInterval(futureBalanceInterval);
}
async function displayFutureBalance() {
  const balanceElement = document.getElementById('futureBalance');
  const withdrawalDate = getWithdrawalDate(); // Retrieve withdrawal date from local storage

  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  if (!account) {
      balanceElement.innerText = 'Please connect your wallet';
      return;
  }

  let futureBalance = await calculateFutureBalance(account, withdrawalDate);
  balanceElement.innerText = `Future Balance: ${web3.utils.fromWei(futureBalance, 'ether')} ETH (withdrawal not available till 6 months)`;
}


async function calculateFutureBalance(account, withdrawalDate) {
  const currentBalance = await thriftSavingsContract.methods.getBalance(account).call();
  const initialBalance = web3.utils.fromWei(currentBalance, 'ether');

  if (initialBalance === '0') {
      return '0';
  }

  const interestRate = 0.03; // 3% interest rate per annum
  const intervalSeconds = 10; // 10 seconds interval
  const secondsInYear = 365 * 24 * 60 * 60; // Number of seconds in a year

  const timeElapsed = (new Date() - new Date(withdrawalDate)) / 1000; // Time elapsed since withdrawal date in seconds
  const yearsElapsed = timeElapsed / secondsInYear; // Convert time elapsed to years

  const futureBalance = Number(initialBalance) * Math.pow((1 + interestRate), yearsElapsed); // Calculate future balance
  return web3.utils.toWei(futureBalance.toString(), 'ether');



}

async function displaySavedWithdrawalDate() {
  const withdrawalDate = getWithdrawalDate();
  if (withdrawalDate) {
    document.getElementById('withdrawalDateDisplay').innerText = `Your saved Withdrawal Date: ${withdrawalDate}`;
  } else {
    document.getElementById('withdrawalDateDisplay').innerText = 'Withdrawal Date not set';
  }
}
window.onload = initialize;