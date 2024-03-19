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

module.exports = router;
