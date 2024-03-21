const PersonalModel = require('../model/personalDetails.model')

// create personal
const createPersonal = async (req, res) => {
    try {
        const {
            name,
             description,
             dob,
             spokenLanguages,
             nationality,
             interests,
             phone,
             gmail,
             github,
             linkedin,
             twitter,
             facebook,
             instagram,
             } = req.body
        //validation
        switch (true) {
            case !name: return res.status(500).send({ error: 'Name is required' })
            case !spokenLanguages: return res.status(500).send({ error: 'Spoken Languages is required' })
        }

        const personal = new PersonalModel({ name,
            description,
            dob,
            spokenLanguages,
            nationality,
            interests,
            phone,
            gmail,
            github,
            linkedin,
            twitter,
            facebook,
            instagram, })
        await personal.save();
        return res.status(201).send({
            success: true,
            message: 'personal created successfully',
            personal
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating personal"
        })
    }
}

// update personal 
const personalUpdate = async (req, res) => {
    try {
        const {  name,
            description,
            dob,
            spokenLanguages,
            nationality,
            interests,
            phone,
            gmail,
            github,
            linkedin,
            twitter,
            facebook,
            instagram, } = req.body

        //validation
        switch (true) {
            case !description: return res.status(500).send({ error: 'Description is required' })

        }
        const personal = await PersonalModel.findByIdAndUpdate(req.params.id,{ name,
            description,
            dob,
            spokenLanguages,
            nationality,
            interests,
            phone,
            gmail,
            github,
            linkedin,
            twitter,
            facebook,
            instagram,})

        return res.status(201).send({
            success: true,
            message: 'personal updated successfully',
            personal
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating personal"
        })
    }
}

//get all personal
const personalList = async (req, res) => {
    try {
        const personal = await PersonalModel.find();

        return res.status(201).send({
            success: true,
            totalCount: personal.length,
            message: 'All personal',
            personal,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting personal",
            error: error.message
        })
    }
}

//get single personal
const personalDetails = async (req, res) => {
    try {
        const personal = await PersonalModel.findOne({ _id: req.params.id });
        console.log(personal)

        return res.status(200).send({
            success: true,
            message: 'single personal fetched',
            personal,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting single personal",
            error: error.message
        })
    }
}

//delete personal
const personalDelete = async (req, res) => {
    try {
        await PersonalModel.findByIdAndDelete(req.params.id ).select("-photo")
     
        return res.status(200).send({
            success: true,
            message: 'personal deleted successfully'
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while deleting personal",
            error
        })
    }
}


module.exports = {
    createPersonal,
    personalUpdate,
    personalList,
    personalDetails,
    personalDelete,
};