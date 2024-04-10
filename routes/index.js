var express = require('express');
var router = express.Router();
var app = express();
const nodemailer = require('nodemailer');
var thriftSavings = require('../public/javascripts/index');

router.use(express.json());

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/thrift-savings', function(req, res, next) {
    res.render('thrift-savings'); 
});


router.get('/contact', function(req, res, next) {
    res.render('contact'); 
});

router.get('/piggy', function(req, res, next) {
    res.render('piggy'); 
});

module.exports = router;
