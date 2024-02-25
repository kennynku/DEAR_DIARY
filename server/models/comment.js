const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    blogId:{
        type: mongoose.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref: 'User',        
        required: true
    },
    comment:{
        type:String,
        required:true
    }

}, {timestamps: true});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;