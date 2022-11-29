const express = require('express');
const { stripePayment } = require('../controllers/stripe');
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth.js');


// Create
router.post('/stripe', stripePayment);


module.exports = router;