const db = require('../config/db')
const Hotels = require('../Models/Hotels');
const Hotels_img = require('../Models/Hotels_img');

module.exports = async(req, res)=>{
    try {
        let email = req.body.email
        const getHotel = await Hotels.findOne({
            where:{
                is_deleted:0,
                email: email
            },
            include:[{
                model: Hotels_img,
                is_deleted: 0
            }],

        })

        const Data = {
            Hotel: getHotel,
            include:[{
                HotelImage: Hotels_img
            }]

        }

        if(!Data){
            return res.status(401).json({
                Success: false,
                Message: "Hotel not found"
            })
        }
        
        return res.status(200).json({
            Success: true,
            Message: "Retrieved Hotel Successfully",
            data: {
                getHotel
            }
        })

    } catch (e) {
        
    }
}


