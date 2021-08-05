const sequelize = require('sequelize');
const db = require('../config/db');

const Users = db.define('users', {
    id: {
        type: sequelize.UUID,
        required: true,
        primaryKey: true
    },
    name:{
        type: sequelize.STRING,
        allowNull: false

    },
    email:{
        type: sequelize.STRING,
        allowNull: false

    },
    phone:{
        type: sequelize.STRING,
        allowNull: false

    },
    password:{
        type: sequelize.STRING,
        allowNull: false

    },
    is_deleted:{
        type: sequelize.BOOLEAN
    }
})

module.exports = Users;