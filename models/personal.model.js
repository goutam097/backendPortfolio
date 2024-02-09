const Sequelize = require("sequelize");
const sequelize = require("../configs/database.config");

const Personal = sequelize.define("personals", {
  dob: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  spoken_languages: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  interest: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  personal_details: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  github: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  twitter: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  google: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  linkdin: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Personal;
