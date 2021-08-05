const sequelize = require('sequelize');
const db = require('../config/db');
const EventHall = require('./EventHall');

const EventHallsImage = db.define('eventhalls_img', {
    id: {
        type: sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    eventhalls_id: {
        type: sequelize.UUID,
        allowNull: false
    },
    frontimage: {
        type: sequelize.STRING,
        allowNull: false
    },
    bImage: {
        type: sequelize.STRING,
    },
    is_deleted: {
        type: sequelize.BOOLEAN,
    },
})

module.exports = EventHallsImage;

EventHallsImage.belongsTo(Halls);