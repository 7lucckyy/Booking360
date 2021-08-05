const sequelize = require('sequelize');
const db = require('../config/db');
const Halls = require('./Halls');

const EventHall = db.define('eventhalls', {
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
    logosrc:{
        type: sequelize.STRING,
        

    },
})

Users.hasOne(EventHall, {
    foreignKey: 'users_id'
})
EventHall.belongsTo(Users, {
    foreignKey: 'users_id'
})
EventHall.hasMany(Halls, {
    foreignKey: 'eventhalls_id'
})

module.exports = EventHall;