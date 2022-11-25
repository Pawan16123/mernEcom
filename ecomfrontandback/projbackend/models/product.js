const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: "CATEGORY",
        required: true,
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        constentType: String
    },
    stock:{
        type:Number,
        default: 0
    }
},{
    timestamps: true
});

module.exports = mongoose.model("PRODUCT", productSchema);