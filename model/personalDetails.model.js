const mongoose = require("mongoose");

const personalDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  dob: {
    type: Date,
  },
  spokenLanguages: [String],
  nationality: {
    type: String,
  },
  interests: [String],
  phone: {
    type: Number,
  },
  gmail: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  twitter: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
});

module.exports = mongoose.model("PersonalDetails", personalDetailsSchema);
