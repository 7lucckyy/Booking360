const sequelize = require('sequelize');
const db = require('../config/db');
const Rooms = require('./Rooms');
const Users = require('./Users');
const Hotels_img = require('./Hotels_img')

const Hotels = db.define('hotels', {
    id: {
        type: sequelize.UUID,
        required: true,
        primaryKey: true
    },
    users_id: {
        type: sequelize.UUID,
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
    address:{
        type: sequelize.STRING,
        allowNull: false

    },
    latitude:{
        type: sequelize.STRING,
    

    },
    longitude:{
        type: sequelize.STRING,
        

    },
    state:{
        type: sequelize.STRING,
        allowNull: false

    },
    lga:{
        type: sequelize.STRING,
        allowNull: false

    },
    is_deleted:{
        type: sequelize.BOOLEAN
    }, 
    description:{
        type: sequelize.TEXT,
        allowNull: false

    },
    
})



Hotels.hasOne(Hotels_img, {
    foreignKey: 'hotels_id'
})
Hotels_img.belongsTo(Hotels, {
    foreignKey: 'hotels_id'
})
Hotels.hasMany(Rooms, {
    foreignKey: 'hotels_id'
})

module.exports = Hotels;