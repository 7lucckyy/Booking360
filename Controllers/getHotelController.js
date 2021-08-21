const db = require('../config/db')
const Hotels = require('../Models/Hotels');
const Hotels_img = require('../Models/Hotels_img');
const { get } = require('../Routes/Router');

module.exports = async(req, res)=>{
    try {
        let Email = req.body.email
        const getHotel = await Hotels.findAll({
            where: {},
            include:[{
                model: Hotels_img,
            }],
        })
        return res.status(200).json({
            Success: true,
            Message: "Retrieved Hotels Successfully",
            data: getHotel
        })

    } catch (e) {
       console.log(e); 
    }
}


