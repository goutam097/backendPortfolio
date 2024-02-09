const Sequelize = require("sequelize");
const sequelize = require("../configs/database.config");

const Testimonial = sequelize.define("testimonials", {
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  stars: {
    type: Sequelize.STRING,
    allowNull: true,
  },
 
});

module.exports = Testimonial;
