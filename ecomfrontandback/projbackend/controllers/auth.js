const userModelCollection = require('../models/user.js');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {expressjwt: ejwt, expressjwt} = require("express-jwt");

exports.signup = (req,res)=>{
    console.log('POST Request received on /api/signUP');
    const err = validationResult(req);
    // console.log(err.errors[0]);
    if(err.errors.length){
       const {msg, param} = err.errors[0];
       return res.status(400).json({
        error: msg,
        field: param
       }) 
    }
    // console.log(req.body);
    let data = req.body;
    const newUser  = new userModelCollection(data);
    newUser.save((err, user)=>{
        console.log('Error while saving the user in DB',err?._message || err);
        if(err){
            return res.status(400).json({
                err: "Unable to save the user in DB"
            })
        }
        res.status(200).json({
            message: 'User saved in DB',
            user:{
                id: user._id,
                name: user.firstName,
                email: user.email
            }
        });
    });
    // res.status(200).json({
    //     message: 'User saved in DB',
    //     user:{
    //         id: newUser._id,
    //         name: newUser.firstName,
    //         email: newUser.email,
    //         email: newUser.password
    //     }
    // });
}

exports.signin = (req,res)=>{
    console.log('POST Request received on /api/signIN');
    const err = validationResult(req);
    // console.log(err.errors[0]);
    if(err.errors.length){
       const {msg, param} = err.errors[0];
       return res.status(400).json({
        error: msg,
        field: param
       }) 
    }
    // console.log(req.body);
    let {email, password} = req.body;
    userModelCollection.findOne({email},(err, user)=>{
        // console.log('FIND ONE RESPONSE: ',err, user);
        if(err || !user){
            return res.status(401).json({
                error: 'Email id does not exists'
            })
        }
        let auth = user.auth(password);
        if(!auth){
            console.log(err);
            return res.status(401).json({
                error: 'Email and password do not match. Please try again'
            });
        }
        const token = jwt.sign({_id: user._id, extra: "data was sent for testing"}, process.env.SECRET);
        res.cookie('token', token, {expire: new Date() + 9999});
        const {_id, firstName, email, role} = user;
        res.status(200).json({
            message: 'User successfully LoggedIN',
            token,
            user: {_id, firstName, email, role}
        });
    });
    // });
}

exports.signout = (req,res)=>{
    console.log('GET Request received on /api/signOUT');
    res.clearCookie('token');
    res.json({
        message: "User Signout"
    })
}


// Protected routes middlewares
// It takes the Autorization token from the header with value in format 'Bearer <toke> 'and just validates whether its a valid token or not that's all. And then add 'auth' to 'req' with _id and iat. Which can be used for authentication. It decodes the token and generates the obj that was sent/used while creating token and sets it in the auth obj of the req.
exports.isSignedIn = ejwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
});

// IsAuthenticated just compares the authId which was added to request from isSignedIn method to the profileId which was set from getUserById method/param.

exports.isAuthenticated = (req,res,next)=>{
    console.log(req.profile?._id,req.auth?._id )
// new ObjectId("6367d1e0752bcaa0ae56bb87") 6367d1e0752bcaa0ae56bb87
    // let checker = req.profile?._id.toString() === req.auth?._id;
    let checker = req.profile?._id == req.auth?._id;
    if(!checker){
        return res.status(403).send("Access Denied");
    }
    next();
}

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0){
        return res.status(403).send("Access Denied");
    }
    next();
}

// module.exports = signout;