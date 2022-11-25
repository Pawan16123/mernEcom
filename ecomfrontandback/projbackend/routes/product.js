const express = require('express');
const router = express.Router();

const { getUserById} = require('../controllers/user.js');
const { isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth.js')
const { getProductById, createProduct, getProduct, photoById, updateProduct, deleteProduct, getAllProducts, getAllUniqueCategory} = require('../controllers/product.js');
// const { getAllCategory } = require('../controllers/category.js');

router.param('userid', getUserById);
router.param('productid', getProductById);

// Create
router.post('/create/:userid', isSignedIn, isAuthenticated, isAdmin, createProduct);

// Read
router.get('/:productid', getProduct);
router.get('/photo/:productid', photoById);

// Read - listing
router.get('/get/getAllproducts', getAllProducts);
router.get('/catogories', getAllUniqueCategory);

// Update
router.put('/update/:productid/:userid', isSignedIn, isAuthenticated, isAdmin, updateProduct);

// Delete
router.delete('/delete/:productid/:userid', isSignedIn, isAuthenticated, isAdmin, deleteProduct);

module.exports = router;