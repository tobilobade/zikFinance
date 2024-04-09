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

router.post('/create-group', async function(req, res, next) {
    const { friendName, friendAddress } = req.body;
    const result = await thriftSavings.createGroup(friendName, friendAddress);
    if (result) {
        res.sendStatus(200);
    } else {
        res.status(500).json({ error: 'Failed to create group' });
    }
});

// Route to retrieve group details
router.get('/group-details/:groupOwnerAddress', async function(req, res, next) {
    try {
        const groupOwnerAddress = req.params.groupOwnerAddress; // Get the group owner's address from the URL parameter
        const groupDetails = await thriftSavings.getGroupDetails(groupOwnerAddress); // Call a function to get group details
        res.json(groupDetails); // Return the group details as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/contact', function(req, res, next) {
    res.render('contact'); // Render the HTML page for all trending movies
});

module.exports = router;
