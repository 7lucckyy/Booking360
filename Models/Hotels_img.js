const sequelize = require('sequelize');
const db = require('../config/db');
const Hotels = require('./Hotels');

const Hotels_img = db.define('hotels_images', {
    id:{
        type: sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    hotels_id:{
        type: sequelize.UUID,
        allowNull: false,
        foreignKey: true
    },
    fimgsrc:{
        type: sequelize.STRING,
        allowNull: false,
    },
    bimgsrc:{
        type: sequelize.STRING,
        allowNull: false
    },
    logosrc:{
        type: sequelize.STRING,
        

    },
    is_deleted:{
        type: sequelize.BOOLEAN,
    }
})



module.exports = Hotels_img;