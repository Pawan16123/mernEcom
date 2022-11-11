const express = require('express');
const router = express.Router();

// Controllers
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth.js');
const {getUserById} = require('../controllers/user.js');
const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, deleteCategory} = require('../controllers/category.js');

router.param('userid', getUserById);
router.param('categorid', getCategoryById);

// Create
router.post('/create/:userid', isSignedIn, isAuthenticated, isAdmin, createCategory);

// Read
router.get('/get/:categorid', getCategory);
router.get('/getallcategory',getAllCategory);

// Update
router.put('/update/:categorid/:userid', isSignedIn, isAuthenticated, isAdmin, updateCategory);

// Delete
router.delete('/delete/:categorid/:userid', isSignedIn, isAuthenticated, isAdmin, deleteCategory);


module.exports = router;