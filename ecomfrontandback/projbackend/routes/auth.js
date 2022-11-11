const express = require('express');
const router = express.Router();
const {signout, signup, signin} = require('../controllers/auth');
const { check, validationResult } = require('express-validator');

// Creatingg the user
router.post('/signup', [
    check('firstName','Name should be three char').isLength({min: 3}),
    check('email','Valid Email is required').isEmail(),
    check('password','Password should be more than six char').isLength({min: 6})
], signup);

// Signing in user
router.post('/signin',[
    check('email','Please enter your registered Email Id:').isEmail(),
    check('password','Please enter your password').isLength({min: 6})
], signin);

router.get('/signout', signout);

module.exports = router;
// export default router;