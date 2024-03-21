const BlogModel = require("../model/blogs.model");
const imageUpload = require("../helpers/image.upload");

// create blog
const createBlogs = async (req, res) => {
    try {
        const { title, description, image } = req.body
        //validation
        switch (true) {
            case !title: return res.status(500).send({ error: 'Title is required' })
            case !description: return res.status(500).send({ error: 'Description is required' })
            case image && image.size > 1000000: return res.status(500).send({ error: 'image is required and should be less than 1mb' })
        }

        const imageName = imageUpload('blog', image.base64Data, image.name)
        const blog = new BlogModel({title, description, image: imageName })
        await blog.save();
        return res.status(201).send({
            success: true,
            message: 'Blog created successfully',
            blog
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating Blog"
        })
    }
}

// update blog 
const blogUpdate = async (req, res) => {
    try {
        const {title, description, image } = req.body

        //validation
        switch (true) {
            case !title: return res.status(500).send({ error: 'Title is required' })
            case !description: return res.status(500).send({ error: 'Description is required' })
            case image && image.size > 1000000: return res.status(500).send({ error: 'image is required and should be less than 1mb' })

        }
        // const imageName = imageUpload('blog', image.base64Data, image.name)
        if(image?.base64Data && image?.name){
            const imageName = imageUpload('blog', image.base64Data, image.name)
            req.body.image = imageName
        }else{
            delete req.body.image
        }
        const blog = await BlogModel.findByIdAndUpdate(req.params.id,req.body)
        // const blog = await BlogModel.findByIdAndUpdate(req.params.id,{image:imageName,title, description})

        return res.status(201).send({
            success: true,
            message: 'Blog updated successfully',
            blog
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating blog"
        })
    }
}

//get all blog
const blogList = async (req, res) => {
    try {
        const baseurl = req.app.locals.baseurl
        let blogs = await BlogModel.find().limit(12).sort({ createdAt: -1 })
        blogs = blogs.map(blog=>{
            blog._doc.image = blog?._doc?.image ? `${baseurl}uploads/blog/${blog._doc.image}`: ''
            return blog._doc
        })
        return res.status(201).send({
            success: true,
            totalCount: blogs.length,
            message: 'All blogs',
            blogs,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting blogs",
            error: error.message
        })
    }
}

//get single blog
const blogDetails = async (req, res) => {
    try {
        const baseurl = req.app.locals.baseurl
        const blog = await BlogModel.findOne({ _id: req.params.id })
        if(blog?.image){
            blog.image = `${baseurl}uploads/blog/${blog.image}`
        }
        return res.status(200).send({
            success: true,
            message: 'single blog fetched',
            blog,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting single blog",
            error: error.message
        })
    }
}

//delete blog
const blogDelete = async (req, res) => {
    try {
        await BlogModel.findByIdAndDelete(req.params.id )
     
        return res.status(200).send({
            success: true,
            message: 'blog deleted successfully'
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while deleting blog",
            error
        })
    }
}


module.exports = { 
    createBlogs,
    blogUpdate,
    blogList,
    blogDetails,
    blogDelete,
    };
