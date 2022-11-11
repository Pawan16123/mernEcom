const {Order, ProductCart} = require('../models/order.js');

exports.getOrderById = (req, res, next, id)=>{
    Order.find(id)
    .populate('products.product', 'name price')
    .exec((err, order)=>{
        if(err){
            return res.status(400).json({
                error: "Order not found"
            })
        }
        req.order = order;
        next();
    })
}

exports.createOrder = (req, res)=>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err, savedOrder) => {
        if(err){
            return res.status(400).json({
                error: "Order not found"
            })
        }
        res.status(200).json({
            message: "Order not found",
            savedOrder
        })
    })
}

exports.getAllOrders = (req, res)=>{
    Order.find()
    .populate("user", "_id name")
    .exec((err, allOrders)=>{
        if(err){
            return res.status(400).json({
                error: "Orders not found"
            })
        }
        res.status(200).json(allOrders)
    })
}
exports.updateStatus = (req, res)=>{
    req.json(Order.schema.path("status").enum);
}

exports.getOrderStatus = (req, res)=>{
    // 
    Order.findOneAndUpdate(
        {_id: req.body.orderId},
       {$set:  {status: req.body.status}},
       (err, order)=>{
        if(err){
            return res.status(400).json({
                error: "Unable to update the order"
            })
        }
        res.status(200).json(order)
       }
    )
}