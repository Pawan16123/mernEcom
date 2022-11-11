const userModelCollection = require('../models/user.js');
const orderModelCollection = require('../models/order.js');

exports.getUser = (req,res)=>{
    console.log(req.profile);
    // setting fields undefined to hide it from response.
    req.profile.salt = req.profile.encryptPassword = req.profile.role = req.profile.updatedAt = undefined;
    // req.profile.createdAt = undefined;

    console.log(req.profile);
    res.json({
        message:"User Found",
        prof: req.profile
    })
}

exports.getUserById = (req, res, next, gid)=>{
    console.log(gid);
    userModelCollection.findById(gid).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "User Not found"
            })
        }
        req.profile = user;
        next()
    })
}

exports.getAllUsers = (req, res)=>{
    let totalUser;
    userModelCollection.count({},(err, count)=>{
        if(err){
            console.log(err);
        }
        totalUser = count;
    })
    userModelCollection.find({}, (err, user)=>{
        if(err || !user){
            return res.status(500).json({
                error: 'Unable to get all the users'
            })
        }
        // console.log(user);
        // let userName = {...user};
        // console.log(userName)
        // user = userName.map((el,index)=>{
        //     console.log('El inside map',el);
        //     console.log(index, el.profile?.salt, el.profile?.encryptPassword)
        //     el.profile?.salt = undefined;
        //     el.profile?.encryptPassword = undefined;
        //     return el;
        // })
        res.json({
            message: 'getting all users for you',
            total:totalUser,
            usersArray: user
        })
    });
}

// udate user without mongoDb methods.
// exports.updateUser = (req,res)=>{
//     // console.log(req.profile);
//     const {firstName, lastName, userInfo} = req.body;
//     userModelCollection.findById(req.profile._id).exec((err,user)=>{
//         if(err || !user){
//             return res.status(400).json({
//                 error: "User Not found"
//             })
//         }

//         if(firstName) user.firstName = firstName;
//         if(lastName) user.lastName = lastName;
//         if(userInfo) user.userInfo = userInfo;
//         user.save();
//         res.json({
//             message: 'Data updated successfully',
//             user
            
//         });
//     })
// }

exports.updateUser = (req,res)=>{

    userModelCollection.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user)=>{
            if(err){
                return res.status(400).json({
                    error: "You are not authorized to update the user"
                })
            }
            user.salt = user.encryptPassword = user.updatedAt = undefined;
            res.json({
                message: 'User udpated successfully',
                user
            })
        }
    )
}

exports.userPurchaseList = (req,res)=>{
    orderModelCollection.find({user: req.profile._id})
    .populate("user", "_id firstName")
    .exec((err, order)=>{
        if(err){
            return res.status(400).json({
                error: "No order found"
            })
        }
        return res.json(order);
    })
}

// pushOrderInPurchaseList this middleware will get data from front end in the body which will be stored in the users schema's purchases. 
exports.pushOrderInPurchaseList = (req, res, next)=>{
    let purchases = [];
    req.body.order.products.forEach(el => {
        const {_id, name, description, category, quantity } = el;
        purchases.push({
            _id, name, description, category, quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id

        })
    })

    userModelCollection.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases}},
        {new: true},
        (err, purchases)=>{
            if(err){
                return res.status(400).json({
                    error: "Unable to save the purchaseList"
                })
            }
            console.log("Purchases success");
            req.purchases = purchases;
            next();  
        }
    )
}