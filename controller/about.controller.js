const AboutModel = require('../model/about.model')
const imageUpload = require("../helpers/image.upload");

// create about
const createAbout = async (req, res) => {
    try {
        let {image, skills, experience} =  req.body;

        image = imageUpload('about',image?.base64Data, image?.name);
        skills = skills.map(skill=>{
            skill.image = imageUpload('about/skill',skill?.image?.base64Data, skill?.image?.name);
            return skill
        })

        const newAbout = await AboutModel.create({image, skills, experience})
        return res.status(201).send({
            success: true,
            message: 'About created successfully',
            newAbout
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating About"
        })
    }
}

const updateAbout = async (req, res) => {
    try {
        const { image, skills, experience } = req.body;
        const updates = {};

        if (image?.base64Data && image?.name) {
            const imageName = await imageUpload('about', image.base64Data, image.name);
            updates.image = imageName;
        }

        if (Array.isArray(skills)) {
            updatedSkills = await Promise.all(skills.map(skill => {
                if (skill?.image?.base64Data && skill?.image?.name) {
                    skill.image = imageUpload('about/skill', skill.image.base64Data, skill.image.name);
                }else if(skill?.image && !skill?.image?.base64Data){
                    skill.image = skill.image.split("/")[skill.image.split("/").length - 1]
                }

                return skill;
            }))
            updates.skills = updatedSkills;
        }

        updates.experience = experience;

        const newAbout = await AboutModel.findByIdAndUpdate(req.params.id, updates, { new: true });

        if (newAbout) {
            return res.status(201).send({
                success: true,
                message: 'About updated successfully',
                newAbout
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'About not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in updating About'
        });
    }
};



// const updateAbout = async (req, res) => {
//     try {
//         let {image, skills, experience} =  req.body;

//         image = imageUpload('about',image?.base64Data, image?.name);
//         skills = skills.map(skill=>{
//             skill.image = imageUpload('about/skill',skill?.image?.base64Data, skill?.image?.name);
//             return skill
//         })

//         if(image?.base64Data && image?.name){
//             const imageName = imageUpload('about', image.base64Data, image.name)
//             req.body.image = imageName
//         }else{
//             delete req.body.image
//         }

//         const newAbout = await AboutModel.findByIdAndUpdate(req.params.id,{image, skills, experience})
//         return res.status(201).send({
//             success: true,
//             message: 'About updated successfully',
//             newAbout
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             error,
//             message: "Error in creating About"
//         })
//     }
// }

//get all about
const aboutList = async (req, res) => {
    try {

        const baseurl = req.app.locals.baseurl;
        let abouts = await AboutModel.find().limit(12).sort({ createdAt: -1 });

        abouts = abouts.map(about => {
            about._doc.image = about?._doc?.image ? `${baseurl}uploads/about/${about._doc.image}` : '';
            about._doc.skills = about._doc.skills.map(skill => {
                skill.image = skill.image ? `${baseurl}uploads/about/skill/${skill.image}` : '';
                return skill;
            });
            return about._doc;
        });

        return res.status(201).send({
            success: true,
            totalCount: abouts.length,
            message: 'All abouts',
            abouts,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting abouts",
            error: error.message
        })
    }
}

//get single about

// const aboutDetails = async (req, res) => {
//     try {
//         const about = await AboutModel.findOne({ id: req.params._id });

//         if (!about) {
//             return res.status(404).send({
//                 success: false,
//                 message: 'About not found',
//             });
//         }

//         return res.status(200).send({
//             success: true,
//             message: 'Single about fetched',
//             about,
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error while getting single about',
//             error: error.message,
//         });
//     }
// };

const aboutDetails = async (req, res) => {
    try {
        // const baseurl = req.app.locals.baseurl
        // const about = await AboutModel.findOne({ _id: req.params.id })
        // if(about?.image){
        //     about.image = `${baseurl}uploads/about/${about.image}`
        // }

        const baseurl = req.app.locals.baseurl;
        const about = await AboutModel.findOne({ _id: req.params.id });

        if (about?.image) {
            about.image = `${baseurl}uploads/about/${about.image}`;
        }

        // Modify skill images to include base URL
        if (about?.skills && about.skills.length > 0) {
            about.skills.forEach(skill => {
                if (skill.image) {
                    skill.image = `${baseurl}uploads/about/skill/${skill.image}`;
                }
            });
        }
        
        return res.status(200).send({
            success: true,
            message: 'single about fetched',
            about,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting single about",
            error: error.message
        })
    }
}

//delete about
const aboutDelete = async (req, res) => {
    try {
        await AboutModel.findByIdAndDelete(req.params.id ).select("-photo")
     
        return res.status(200).send({
            success: true,
            message: 'about deleted successfully'
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while deleting about",
            error
        })
    }
}

module.exports = {
    createAbout,
    updateAbout,
    aboutList,
    aboutDetails,
    aboutDelete
};