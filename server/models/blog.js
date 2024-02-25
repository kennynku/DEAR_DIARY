const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    snippet:{
        type: String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type: String
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    category:{
        type: String,
    },
    likes:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    views:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]

}, {timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;