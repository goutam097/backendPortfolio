const Sequelize = require("sequelize");
const sequelize = require("../configs/database.config");

const Service = sequelize.define("services", {
  logo: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  short_title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },

});

module.exports = Service;
