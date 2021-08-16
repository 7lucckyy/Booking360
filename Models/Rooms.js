const sequelize = require('sequelize');
const db = require('../config/db');
const Hotels = require('./Hotels');
const Rooms_imgs = require('./Rooms_img');

const Rooms = db.define('rooms', {
    id: {
        type: sequelize.UUID,
        primaryKey: true,
        allowNull: false
    },
    hotels_id: {
        type: sequelize.UUID,
        allowNull: false
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    price: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    quantity: {
        type: sequelize.BIGINT,
        allowNull: false
    },
    description: {
        type: sequelize.TEXT
    },
    is_deleted: {
        type: sequelize.BOOLEAN
    }
})


module.exports = Rooms;

Rooms.hasOne(Rooms_imgs, {
    foreignKey: 'rooms_id'
})
Rooms_imgs.belongsTo(Rooms, {
    foreignKey: 'rooms_id'
})