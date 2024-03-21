const TestimonialModel = require("../model/testimonials.model");
const imageUpload = require("../helpers/image.upload");

// create testimonial
const createTestimonials = async (req, res) => {
    try {
        const { title, name, description, rating, image } = req.body
        //validation
        switch (true) {
            case !title: return res.status(500).send({ error: 'Title is required' })
            case !description: return res.status(500).send({ error: 'Description is required' })
            case image && image.size > 1000000: return res.status(500).send({ error: 'image is required and should be less than 1mb' })
        }

        const imageName = imageUpload('testimonial', image.base64Data, image.name)
        const testimonial = new TestimonialModel({title,name, description, rating, image: imageName })
        await testimonial.save();
        return res.status(201).send({
            success: true,
            message: 'Testimonials created successfully',
            testimonial
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating Testimonials"
        })
    }
}

// update testimonial 
const testimonialUpdate = async (req, res) => {
    try {
        const {title, name, description, rating, image } = req.body

        //validation
        switch (true) {
            case !title: return res.status(500).send({ error: 'Title is required' })
            case !description: return res.status(500).send({ error: 'Description is required' })
            case image && image.size > 1000000: return res.status(500).send({ error: 'image is required and should be less than 1mb' })

        }
        // const imageName = imageUpload('testimonial', image.base64Data, image.name)
        if(image?.base64Data && image?.name){
            const imageName = imageUpload('testimonial', image.base64Data, image.name)
            req.body.image = imageName
        }else{
            delete req.body.image
        }
        const testimonial = await TestimonialModel.findByIdAndUpdate(req.params.id,req.body)

        return res.status(201).send({
            success: true,
            message: 'testimonial updated successfully',
            testimonial
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating testimonial"
        })
    }
}

//get all testimonial
const testimonialList = async (req, res) => {
    try {
        const baseurl = req.app.locals.baseurl
        let testimonial = await TestimonialModel.find().limit(12).sort({ createdAt: -1 })
        testimonial = testimonial.map(testimonial=>{
            testimonial._doc.image = testimonial?._doc?.image ? `${baseurl}uploads/testimonial/${testimonial._doc.image}`: ''
            return testimonial._doc
        })
        return res.status(201).send({
            success: true,
            totalCount: testimonial.length,
            message: 'All testimonial',
            testimonial,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting testimonial",
            error: error.message
        })
    }
}

//get single testimonial
const testimonialDetails = async (req, res) => {
    try {
        const baseurl = req.app.locals.baseurl
        const testimonial = await TestimonialModel.findOne({ _id: req.params.id })
        if(testimonial?.image){
            testimonial.image = `${baseurl}uploads/testimonial/${testimonial.image}`
        }
        return res.status(200).send({
            success: true,
            message: 'single testimonial fetched',
            testimonial,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting single testimonial",
            error: error.message
        })
    }
}

//delete testimonial
const testimonialDelete = async (req, res) => {
    try {
        await TestimonialModel.findByIdAndDelete(req.params.id )
     
        return res.status(200).send({
            success: true,
            message: 'testimonial deleted successfully'
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while deleting testimonial",
            error
        })
    }
}


module.exports = { 
    createTestimonials,
    testimonialUpdate,
    testimonialList,
    testimonialDetails,
    testimonialDelete,
    };
