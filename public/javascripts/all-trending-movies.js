// all-trending-movies.js
  const apiKey = "df2c6de7e8ef7c7485ddf9aaf8f0204f";
document.addEventListener("DOMContentLoaded", function() {
    // Your TMDb API key
  
    
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
  
    // Function to render all trending movies on the webpage
    async function renderAllTrendingMovies() {
      const trendingMoviesContainer = document.getElementById("trendingMoviesContainer");
  
      const allTrendingMovies = await fetchAllTrendingMovies();
      if (allTrendingMovies.length === 0) {
        trendingMoviesContainer.innerHTML = "<p>No trending movies found.</p>";
        return;
      }
  
      // Generate HTML for all trending movies
      const moviesHtml = allTrendingMovies.map(movie => {
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
                  <button>1 Sep </button>
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
  
    // Call the renderAllTrendingMovies function to display all trending movies on page load
    renderAllTrendingMovies();
  

  
  });
  

async function searchMovies() {
    const searchQuery = document.getElementById("searchInput").value;
  
    // Construct the search API URL
    const searchApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
  
    try {
      const response = await fetch(searchApiUrl);
      const data = await response.json();
  
      // Render the search results
      renderSearchResults(data.results);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  }
  
    // Function to render search results
    function renderSearchResults(results) {
      const trendingMoviesContainer = document.getElementById("trendingMoviesContainer");
  
      if (results.length === 0) {
        trendingMoviesContainer.innerHTML = "<p>No movies found.</p>";
        return;
      }
  
      // Generate HTML for search results
      const moviesHtml = results.map(movie => {
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
                  <div>
                  <button>1 Sep </button>
                  <button>view details</button>
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
    

      
