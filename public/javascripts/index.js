let account;
const connectMetamask = async () => {
    if(window.ethereum !== "undefined") {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        account = accounts[0];
        document.getElementById("userArea").innerHTML = `User Account: ${account}`;
    }
}

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
      return `
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid rounded-start" alt="${movie.title}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.overview}</p>
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
