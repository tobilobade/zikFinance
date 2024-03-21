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

router.get('/purchased', async (req, res) => {
  // Render the purchase tokens form using EJS
  const { movieId, movieTitle, movieOverview, posterPath } = req.query;
  res.render('purchasedSep', { movieTitle, movieOverview, posterPath });
});

module.exports = router;
