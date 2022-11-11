const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 30,
        unique: true
    }
},{timestamps: true});


module.exports = mongoose.model("CATEGORY", categorySchema);


