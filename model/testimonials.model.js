const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        name: {
            type: String,
        },
        rating:{
            type:Number,
            min:0,
            max:5
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
