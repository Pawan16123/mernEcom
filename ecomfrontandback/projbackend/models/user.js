const mongoose = require('mongoose');
const {Schema} = mongoose;
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');

/*{
    "firstName": "",
    "lastName": "",
    "email": "",
    "userInfo": "",
    "password": "",
}*/

const userSchema = new Schema({
    firstName :{
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    lastName :{
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    email :{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userInfo :{
        type: String,
        trim: true
    },
    encryptPassword :{
        type: String,
        required: true,
    },
    salt: String,
    purchases:{
        type: Array,
        defaul:[]
    },
    role:{
        type: Number,
        default: 0
    }

},{
    timestamps: true
})
// role is not protected requests can be intercepted and role can be set to modified.
userSchema.virtual('password')
.set(function(pass){
    this._password = pass;
    this.salt = uuidv4();
    this.encryptPassword = this.securePass(pass);
})
.get(function(){
    console.log(this._password);
    return this._password;
})

userSchema.methods = {
    auth: function(plainPass){
        return this.encryptPassword === this.securePass(plainPass);
    },
    securePass : function(password){
        if(!password) return "Password field can't be empty";
        try{
            const hash = crypto.createHmac('sha256', this.salt)
               .update(password)
               .digest('hex');
            return hash;
        }catch(err){
            return err;
        }
    }
}

module.exports = mongoose.model('USER', userSchema);