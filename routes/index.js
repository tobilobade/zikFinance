var express = require('express');
var router = express.Router();
var app = express();
const nodemailer = require('nodemailer');

router.use(express.json());

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

router.get('/contact', function(req, res, next) {
  res.render('contact'); // Render the HTML page for all trending movies
});



module.exports = router;
