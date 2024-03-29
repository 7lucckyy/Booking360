const sequelize = require('sequelize');
const db = require('../config/db');

const Rooms_imgs = db.define('rooms_images', {
    id:{
        type: sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    rooms_id:{
        type: sequelize.UUID,
        allowNull: false,
        foreignKey: true
    },
    fimage:{
        type: sequelize.STRING,
        allowNull: false,
    },
    bimage:{
        type: sequelize.STRING,
    },
    image:{
        type: sequelize.STRING,
    },
    is_deleted:{
        type: sequelize.BOOLEAN,
    } 
})

module.exports = Rooms_imgs;