const express = require("express");
const { createBlogs, blogList, blogDetails, blogDelete, blogUpdate } = require("../controller/blogs.controller");
const { createAbout, aboutList, updateAbout, aboutDetails, aboutDelete } = require("../controller/about.controller");
const { createService, serviceList, serviceDetails, serviceUpdate, serviceDelete } = require("../controller/service.controller");
const { createPersonal, personalList, personalDetails, personalUpdate, personalDelete } = require("../controller/personal.controller");
const { createTestimonials, testimonialList, testimonialDetails, testimonialUpdate, testimonialDelete } = require("../controller/testimonial.controller");


const router = express.Router();

//blog router
router.post("/create/blogs", createBlogs).get("/blogs/list", blogList).get("/blogs/details/:id", blogDetails);
router.put('/blogs/update/:id', blogUpdate).delete("/blogs/delete/:id", blogDelete);


//about router
router.post('/create/about',createAbout).get("/abouts/list", aboutList).get("/abouts/details/:id", aboutDetails);
router.put('/abouts/update/:id', updateAbout).delete("/abouts/delete/:id", aboutDelete);


//service router
router.post('/create/service',createService).get("/service/list", serviceList).get("/service/details/:id", serviceDetails);
router.put('/service/update/:id', serviceUpdate).delete("/service/delete/:id", serviceDelete);

//personal router
router.post('/create/personal',createPersonal).get("/personal/list", personalList).get("/personal/details/:id", personalDetails);
router.put('/personal/update/:id', personalUpdate).delete("/personal/delete/:id", personalDelete);


//testimonial router
router.post("/create/testimonial", createTestimonials).get("/testimonial/list", testimonialList).get("/testimonial/details/:id", testimonialDetails);
router.put('/testimonial/update/:id', testimonialUpdate).delete("/testimonial/delete/:id", testimonialDelete);



module.exports = router;