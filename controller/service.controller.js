const ServiceModel = require('../model/services.model')
const imageUpload = require("../helpers/image.upload");

// create service
const createService = async (req, res) => {
    try {
        const {title, description, image } = req.body
        //validation
        switch (true) {
            case !title: return res.status(500).send({ error: 'Title is required' })
            case !description: return res.status(500).send({ error: 'Description is required' })
            case image && image.size > 1000000: return res.status(500).send({ error: 'image is required and should be less than 1mb' })
        }

        const imageName = imageUpload('service', image.base64Data, image.name)
        const service = new ServiceModel({title, description, image: imageName })
        await service.save();
        return res.status(201).send({
            success: true,
            message: 'service created successfully',
            service
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating service"
        })
    }
}

// update service 
const serviceUpdate = async (req, res) => {
    try {
        const {title, description, image } = req.body

        //validation
        switch (true) {
            case !title: return res.status(500).send({ error: 'Title is required' })
            case !description: return res.status(500).send({ error: 'Description is required' })
            case image && image?.size > 1000000: return res.status(500).send({ error: 'image is required and should be less than 1mb' })

        }
        if(image?.base64Data && image?.name){
            const imageName = imageUpload('service', image.base64Data, image.name)
            req.body.image = imageName
        }else{
            delete req.body.image
        }
        const service = await ServiceModel.findByIdAndUpdate(req.params.id,req.body)

        return res.status(200).send({
            success: true,
            message: 'service updated successfully',
            service
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating service"
        })
    }
}

//get all service
const serviceList = async (req, res) => {
    try {
        const baseurl = req.app.locals.baseurl
        let services = await ServiceModel.find().limit(12).sort({ createdAt: -1 })
        services = services.map(service=>{
            service._doc.image = service?._doc?.image ? `${baseurl}uploads/service/${service._doc.image}`: ''
            return service._doc
        })
        return res.status(201).send({
            success: true,
            totalCount: services.length,
            message: 'All service',
            services,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting service",
            error: error.message
        })
    }
}

//get service blog
const serviceDetails = async (req, res) => {
    try {
        const baseurl = req.app.locals.baseurl
        const service = await ServiceModel.findOne({ _id: req.params.id })
        if(service?.image){
            service.image = `${baseurl}uploads/service/${service.image}`
        }
        return res.status(200).send({
            success: true,
            message: 'single service fetched',
            service,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting single service",
            error: error.message
        })
    }
}

//delete service
const serviceDelete = async (req, res) => {
    try {
        await ServiceModel.findByIdAndDelete(req.params.id )
     
        return res.status(200).send({
            success: true,
            message: 'service deleted successfully'
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while deleting service",
            error
        })
    }
}



module.exports = {
    createService,
    serviceList,
    serviceUpdate,
    serviceDetails,
    serviceDelete
};