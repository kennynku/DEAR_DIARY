const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const User = require('./models/user');
const Blog = require('./models/blog');
const Comment = require('./models/comment');
const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const secretKey = process.env.ACCESS_TOKEN_SECRET

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));

//Connect to MongoDB database
const dbURI = 'mongodb+srv://ntsako:KennyBrave2023@bloggershub.pqcx0p4.mongodb.net/blogger_hub_DB?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then(res => {
        console.log('MongoDB connected')
        app.listen(4000, () => console.log('listening on port 4000'));
    })
    .catch(err => console.log('Mongo error:', err));

// Setup multer for image processing

//User registration and password encryption
app.post('/register', async (req, res) => {
    try{
        //Hash password before saving it in the DB
        req.body.password = await bcrypt.hash(req.body.password, 10);
        let user = await new User({...req.body});
        console.log(user);
        await user.save();
        return res.sendStatus(200);

    } catch(err) {
        res.sendStatus(500);
        console.log('register request error: ', err);
    }
})

//User Login
app.post('/login', async (req, res) => {
    //Authenticate the user
    const user = await User.findOne({email: req.body.email})
        if (user == null) {
            return res.status(400).send('Cannot find user')
        }
        try{
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const accessToken = jwt.sign({email: user.email}, secretKey)
                res.status(200).json({ accessToken: accessToken, user_id: user._id});
                console.log('Logged in succesfully');
            }
            else{
                res.sendStatus(403);
            }
            console.log("Token", user._id);
            
        } catch (err) {
            res.status(500).send('Error logging you in, please try again later');
            console.log('Login error: ', err);
        }
})
//Receive new blog
app.post('/blog/new', authenticateToken, async (req, res) => {

    try{
        const { title, snippet, content, author, blog_image } = req.body;
        console.log(req.body);
        let newBlog = await new Blog({...req.body});
        await newBlog.save();
        //console.log(newBlog);
        res.status(200).json("New blog created");
    } catch (err){
        console.log("blog creation error: ", err);
    }
})

//Get user blogs for profile page
app.post('/profile/blogs', authenticateToken, async (req, res) => {
    const userBlogs = await Blog.find({author: req.body.userId})
    if (userBlogs === null) {
        return res.status(400).send('No blogs available');
    } else {
        res.status(200).json(userBlogs);
    }
})
//Update user details
app.put('/user/update', authenticateToken, async (req, res) => {
    console.log("request rececived");
    try {
       const user =  await User.findByIdAndUpdate(req.body.user_id, {$set: req.body}, { new: true });
       if (user) {
        res.status(200);
        console.log(user);
       } else {
        res.status(404).send('User not found');
       }
    } catch (error) {
        console.log(error);
        res.status(500).send('try again later');
    }
})
//Global search
app.get('/search', async (req, res) => {
    try{
        const { search_key } = req.query;
        const blogs = await Blog.find({ title: {$regex: new RegExp(search_key, 'i') } })
        if (blogs === null) {
            res.status(400).send('No blogs or this category');
        }
        console.log(search_key);
        res.status(200).json(blogs);
    } catch(error) {
        console.log(error);
        res.status(500).send('Server error, try again later');
    }
})
//Get blogs of a said category
app.get('/categories/category', async (req, res) => {
    try {
        const { category } = req.query;
        const blogs = await Blog.find({category: category});
        if (blogs === null){
            return res.status(400).send('No blogs for this category')
        }
        console.log(blogs);
        res.status(200).json(blogs);
    } catch (err){
        console.log(err.message);
        res.status(500).send('Soemthing went wrong on our end try again later')
    }
})
//Get home blogs
app.get('/home/blogs', async (req, res) => {
    try {
        // Fetch the first twelve blogs
        const blogs = await Blog.find().limit(12);

        // Extract the IDs of these blogs
        const blogIds = blogs.map(blog => blog._id);

        // Fetch comments concurrently
        const commentsPromise = Comment.find({ blogId: { $in: blogIds } }).populate({
            path: 'userId',
            select: 'username', // Adjust to the actual field name in the 'User' model
        });

        // Wait for both blog and comments promises to resolve
        const [comments] = await Promise.all([commentsPromise]);

        // Attach comments to the respective blogs
        blogs.forEach(blog => {
            const blogComments = comments.filter(comment => comment.blogId.equals(blog._id));
            blog.comments = blogComments;
        });

        res.status(200).json(blogs);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Something went wrong on our end, try again later');
    }
});



app.get('/blogs/view', async (req, res) => {
    try{
        const [blog, comments] = await Promise.all([
            Blog.findOne({ _id: req.query.blogId }),
            Comment.find({ blogId: req.query.blogId }).populate({
                path: 'userId',
                select: 'userName'})
            ])

            if (blog === null) {
                return res.status(400).send('Invalid blog id');
            } else {
                const response = {
                    blog: blog,
                    comments: comments
                }
                res.status(200).json(response);
            };
    } catch(err) {
        res.status(500).send('Internal Server error')
    }

})


app.put("/blog/like", authenticateToken, async (req, res) => {
    try {
        const { blogId, userId } = req.body;
        const likedBlog = await Blog.findById(blogId);

        if (!likedBlog) {
            res.status(404).send('Blog not found');
            return;
        }

        if (likedBlog.likes.includes(userId)) {

            await Blog.findOneAndUpdate(
                {_id: blogId},
                {$pull: { likes: userId }},
            )
            console.log('blog unliked');
            res.status(200).send('Blog unliked');
        } else {

            await Blog.updateOne(
                { _id: blogId },
                { $push: { likes: userId }}
            );
            console.log("blog liked");
            res.status(200).send('Blog Liked');
        }
    }catch(err) {
        console.error(err.message);;
        res.status(500).send("Something went wrong on our end please try again later");
    }
})

//Impressions logic

app.put("/blog/impression", authenticateToken, async (req, res) => {
    try {
        const { blogId, userId } = req.body;
        const viewedBlog = await Blog.findById(blogId);

        if (!viewedBlog) {
            res.status(404).send('Blog not found');
            return;
        }

        if (viewedBlog.views.includes(userId)) {

           return res.status(200).send('already viewed blog');
        
        } else {

            await Blog.updateOne(
                { _id: blogId },
                { $push: { views: userId }}
            );
            res.status(200).send('New view');
        }
    }catch(err) {
        console.error(err.message);
        res.status(500).send("Something went wrong on our end please try again later");
    }
})

//Verify token
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null){
        return res.sendStatus(401);
    }
    jwt.verify(token, secretKey, (err, user) =>{
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}
// Add new comment

app.post('/blogs/comment', authenticateToken, async (req, res) => {
    try {
        const { blogId, comment, userId } = req.body;

        const newComment = new Comment({
            blogId: blogId,
            userId: userId,
            comment: comment,
        });

        await newComment.save();
        res.status(201).send('Comment added successfully');
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).send('Internal Server Error');
    }
});