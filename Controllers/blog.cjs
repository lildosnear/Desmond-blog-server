const Blog = require("../models/blog.cjs")
// 1. create a blog
const createBlog = async (req, res)=>{
    // res.send("created")
    // console.log(req.user);
    const {userId} = req.user 
    req.body.createdby = userId
    try {
        const blog = await Blog.create(req.body)
        res.status(201).json({success: true, blog})
    } catch (error) {
        res.json({error})
    }  
}
// 2. get all blogs
const getBlog = async (req, res)=>{
    // res.send("get all blog")
    const {userId} = req.user 
    try {
        const blog = await Blog.find({createdby: userId})
        res.status(200).json({success: true, blog})
    } catch (error) {
        res.json({error})
    }
}
// 3. get single blog
const getSingleBlog = async(req, res)=>{
    // res.send("single blog")
    const {userId} = req.user
    const {blogId} = req.params
    try {
        const blog = await Blog.findOne({createdby: userId, _id: blogId})
        res.status(200).json({success: true, blog})
    } catch (error) {
        res.json({error})
    }
}
// 4. update a blog
const updateBlog = async(req, res)=>{
    // res.send("updated")
    const {userId} = req.user
    const {blogId} = req.params
    try {
        const blog = await Blog.findByIdAndUpdate({createdby: userId, _id: blogId}, req.body, {new: true}, {runValidators: true});
    } catch (error) {
        res.json({error})
    }
}
// 5 delete a blog
const deleteBlog = async(req, res)=>{
    // res.send("deleted")
    const {userId} = req.user;
    const {blogId} = req.params;
    try {
        const blog = await Blog.findByIdAndDelete({createdby: userId, _id: blogId})
        res.status(200).json({success: true, msg: "Blog deleted successfully"})
    } catch (error) {
        res.json({error})
    }
}

module.exports = {createBlog, getBlog, getSingleBlog, updateBlog, deleteBlog}