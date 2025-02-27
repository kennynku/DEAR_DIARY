const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        unique:true,
        required:true,
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;