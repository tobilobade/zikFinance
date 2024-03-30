var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/all-trending-movies', function(req, res, next) {
  res.render('all-trending-movies'); // Render the HTML page for all trending movies
});

router.get('/gift-friend', function(req, res, next) {
  res.render('gift-friend'); // Render the HTML page for all trending movies
});

router.get('/movie-details', async (req, res) => {
  const { movieId, movieTitle, movieOverview, posterPath } = req.query;
  
  try {
    const apiKey = "df2c6de7e8ef7c7485ddf9aaf8f0204f";
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,videos,recommendations`;
    const response = await fetch(apiUrl);
    const movieDetails = await response.json();

    res.render('movie-details', { 
      movieId, 
      movieTitle, 
      movieOverview, 
      posterPath,

      releaseDate: movieDetails.release_date,
      genre: movieDetails.genres.map(genre => genre.name).join(', '),
      rating: movieDetails.vote_average,
      runtime: movieDetails.runtime,
      cast: movieDetails.credits.cast,
      trailers: movieDetails.videos.results.filter(video => video.type === "Trailer"),
      recommendations: movieDetails.recommendations.results,
      // Add more details as needed
    });
  } catch (error) {
    console.error("Error fetching movie details:", error);
    // Rendered the page with basic information if there's an error
    res.render('movie-details', { movieId, movieTitle, movieOverview, posterPath });
  }
});

router.get('/purchased', async (req, res) => {
  // Rendered the purchase tokens form using EJS
  const { movieId, movieTitle, movieOverview, posterPath } = req.query;
  res.render('purchasedSep', { movieTitle, movieOverview, posterPath });
});

module.exports = router;
