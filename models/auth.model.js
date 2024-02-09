const Sequelize = require("sequelize");
const sequelize = require("../configs/database.config");

const Auth = sequelize.define("auths", {
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Auth;
