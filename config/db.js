const sequelize = require('sequelize');


const db = new sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.HOSTNAME,
    dialect: process.env.DIALECT_NAME
})


module.exports = db;