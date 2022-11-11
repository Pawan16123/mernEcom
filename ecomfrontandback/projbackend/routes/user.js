const express = require('express');
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth.js');
const {getUserById, getUser, getAllUsers, updateUser, userPurchaseList} = require('../controllers/user');

router.param('userid', getUserById);

router.get('/:userid', isSignedIn, isAuthenticated, getUser);
router.put('/:userid',isSignedIn, isAuthenticated, updateUser);
router.get('/order/:userid', isSignedIn, isAuthenticated, userPurchaseList);



// Test routes
//Getting all the users users
// router.get('/test/all', getAllUsers);
// router.param('something',(req, res, next, id)=>{
//     console.log(id, 'When something is populated param will call this function');
//     next();
// })
// Checking the working of isSignedIn middleware
router.get('/test/testauth/:something',isSignedIn,(req, res)=>{
    console.log(req.params.something, req.body, req.auth);
    res.json({
        log: 'testing in progress',
        body: req.auth
    })
})



module.exports = router;