const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
});

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  date: {
    type: String,
  },
  image: {
    type: String,
  },
});

const aboutSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    skills: [skillSchema],
    experience: [experienceSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("About", aboutSchema);
