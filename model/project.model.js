const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    image: {
      type: String
    },
    title: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
