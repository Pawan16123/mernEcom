const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth.js');
const { getUserById , pushOrderInPurchaseList} = require('../controllers/user.js');
const {updateStock, getProductById} = require('../controllers/product');
const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require('../controllers/order.js');

router.param('userid', getUserById);
router.param('productid', getProductById);
router.param('orderid', getOrderById);

// Create
router.post('/create/:userid/', isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);

// Read
router.get('/get/:orderid', getOrderById);
router.get('/getAllOrders', isSignedIn, isAuthenticated, isAdmin, getAllOrders)
// Get status 
router.get("/status/:userid", isSignedIn, isAuthenticated, getOrderStatus)

// Update
router.get("/status/:orderid/:userid", isSignedIn, isAuthenticated, isAdmin, updateStatus)

module.exports = router;