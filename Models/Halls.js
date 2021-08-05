const sequelize = require('sequelize');
const db = require('../config/db');
const EventHall = require('./EventHall');
const EventHallsImage = require('./EventHalls_img');

const Halls = db.define('halls', {
    id:{
        type: sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    eventhalls_id:{
        type: sequelize.UUID,
        allowNull: false,
        foreignKey: true
    },
    name:{
        type: sequelize.STRING,
        allowNull: false
    },
    capacity:{
        type: sequelize.BIGINT
    },
    description:{
        type: sequelize.STRING
    },
    price:{
        type: sequelize.FLOAT
    },
    quantity:{
        type: sequelize.BIGINT,
    },
    is_deleted: {
        type: sequelize.BOOLEAN
    },

})

module.exports = Halls;

Halls.belongsTo(EventHall, {
    foreignKey: 'eventhalls_id'
})
Halls.hasOne(EventHallsImage, {
    foreignKey: 'eventhalls_id'
})
