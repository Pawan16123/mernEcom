const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = Schema;

const ProductCartSchema = new Schema({
    products:{
        type: ObjectId,
        ref: "PRODUCT"
    },
    name: String,
    quantity: Number,
    updatedPrice: Number
})
// quantity
const orderSchema = new Schema({
    product: [ProductCartSchema],
    transaction_id: {},
    amount: {
        type: Number,
    },
    address: String,
    status: {
        type: String,
        default: "",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "USER"
    }
},{timestamps: true});
const Order = mongoose.model("ORDER", orderSchema);
const ProductCart = mongoose.model("PRODUCTCART", ProductCartSchema);
module.exports = {Order, ProductCart};