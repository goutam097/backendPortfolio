const Sequelize = require("sequelize");
const sequelize = require("../configs/database.config");

const Education = sequelize.define("educations", {
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  degree: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  short_title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  year: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  skills: {
    type: Sequelize.STRING,
    allowNull: true,
  },
 
});

module.exports = Education;
