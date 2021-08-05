const db = require('../config/db');
const Hotels = require('../Models/Hotels');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')
const Hotels_img = require('../Models/Hotels_img');
const path = require('path')
const validator = require('validator')





module.exports = async (req, res)=>{
    try {

        
        const Transaction = await db.transaction();
        

        try {
            const HotelUUID = uuidv4()
        
        let {users_id, name, email, phone, address, latitude, longitude, state, lga, description} = req.body;
        

        if(validator.isEmpty(name)){
            return res.status(400).json({
                Success: false,
                Message: "Oops Name is Required",
                Description: "Name must be fill cant be blank"
            })
        }
        if(validator.isEmpty(email)){
            return res.status(400).json({
                Success: false,
                Message: "Oops Email is Required",
                Description: "Email must be fill cant be blank"
            })
        }
        if(validator.isEmail(email)==false){
            return res.status(400).json({
                Success: false,
                Message: "Oops Invalid Email Format",
                Description: "Email address format must be example@email.com"
            })
        }
        const CheckUser =  await Hotels.findOne({
            where:{
                email: email
            }
        })
        if(CheckUser){
            return res.status(400).json({
                Success: false,
                Message: "Hotel Already exist",
                Description: "Hotel Email already exist on the Database"
            })
        }

        let Fimage = req.files.fimgsrc[0]
        let bimgsrc = req.files.bimgsrc[0]
        let logosrc = req.files.logosrc[0]
        console.log(req.files);
        const registerHotels = await Hotels.create({
            id: HotelUUID,
            users_id: users_id,
            name: name,
            email: email,
            phone: phone,
            address: address,
            latitude: latitude,
            longitude: longitude,
            state: state, 
            lga: lga,
            is_deleted: 0,
            description: description,
        })
        {
            transaction:Transaction
        }
        
        await Hotels_img.create({
            id: uuidv4(),
            hotels_id: HotelUUID,
            fimgsrc: Fimage.path,
            bimgsrc: bimgsrc.path,
            logosrc: logosrc.path,
            is_deleted: 0

        })
        {
            transaction:Transaction
        }
        
        await Transaction.commit();
        return res.status(201).json({
            msg: "Created Successfully"
        })
        } catch (e) {
            await Transaction.rollback();
            console.log(e) 
        }
        
    } catch (e) {
        console.log(e)
    }
}