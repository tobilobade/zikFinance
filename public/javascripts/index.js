
let account;
const connectMetamask = async () => {
    if(window.ethereum !== "undefined") {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        account = accounts[0];
        document.getElementById("userArea").innerHTML = `User Account: ${account}`;
    }
  }





// Function to handle transaction
async function handlePurchase(movieId, movieTitle, movieOverview, posterPath) {
  const contractAddress = '0x6af55c49055f56dc48afb7a9e182e5a6eb32c7f0';
  const contractABI = [
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
  ]; // Your contract ABI

  try {
      // Check if MetaMask is installed
      if (window.ethereum) {
          // Initialize Web3 with the current provider
          const web3 = new Web3(window.ethereum);
          // Request account access if needed
          await window.ethereum.enable();
          // Get the accounts
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];

          // Initialize contract instance
          const contract = new web3.eth.Contract(contractABI, contractAddress);

          // Call the purchaseTicket function
          const receipt = await contract.methods.purchaseTicket().send({
              from: account,
              value: web3.utils.toWei('0.1', 'ether'), // Sending 0.2 ether
          });

          // Transaction successful, redirect user
          const queryParams = new URLSearchParams({
            movieId,
            movieTitle: encodeURIComponent(movieTitle),
            movieOverview: encodeURIComponent(movieOverview),
            posterPath: encodeURIComponent(posterPath)
        }).toString();

          window.location.href = `/purchased?${queryParams}`;
      } else {
          console.error('MetaMask is not installed.');
      }
  } catch (error) {
      console.error('Error processing transaction:', error);
      // Handle error
  }
}




//when the window loads, it displays the content gotten from tmdb api
document.addEventListener("DOMContentLoaded", function() {
  // Your TMDb API key
  const apiKey = "df2c6de7e8ef7c7485ddf9aaf8f0204f";
  
  // Endpoint URL for trending movies
  const apiUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;

  // Function to fetch all trending movies from TMDb API
  async function fetchAllTrendingMovies() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      return [];
    }
  }

  // Function to render the first 6 trending movies on the webpage
  async function renderFirstSixTrendingMovies() {
    const trendingMoviesContainer = document.getElementById("trendingMovies");

    const allTrendingMovies = await fetchAllTrendingMovies();
    if (allTrendingMovies.length === 0) {
      trendingMoviesContainer.innerHTML = "<p>No trending movies found.</p>";
      return;
    }

  
    // Take only the first 6 movies
    const firstSixTrendingMovies = allTrendingMovies.slice(0, 6);

    // Generate HTML for the first 6 trending movies
    const moviesHtml = firstSixTrendingMovies.map(movie => {
      const overviewWords = movie.overview.split(" ").slice(0, 15);
      const truncatedOverview = overviewWords.join(" ");

      return `
        <div class="card mb-3">
          <div class="row g-0">

            <div class="col-md-4 card-image">
              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid rounded-start" alt="${movie.title}">
            </div>

            <div class="col-md-7">
              <div class="card-body card-text-container">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${truncatedOverview} ...</p>
                <div class="d-flex justify-content-evenly">
                  <button onClick="handlePurchase('${movie.id}', '${movie.title}', '${movie.overview}', '${movie.poster_path}')">0.1 Sep </button>
                  <button>Details</button>
                  </div>
              </div>
            </div>

          </div>
        </div>
      `;
    }).join("");

    // Append HTML to the container
    trendingMoviesContainer.innerHTML = moviesHtml;
  }

  // Call the renderFirstSixTrendingMovies function to display the first 6 trending movies on page load
  renderFirstSixTrendingMovies();
});
