const db = require('.../config/db')
const Hotels = require('../Models/Hotels');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')
const Hotels_img = require('../Models/Hotels_img');
const path = require('path')
const validator = require('validator');






module.exports = async (req, res)=>{
        try {

            let {name, email, phone, address, latitude, longitude, state, lga, description} = req.body;

            if(validator.isEmpty(name)){
                return res.status(400).json({
                    Success: false,
                    Message: "Oops Name is Required",
                    Description: "Name must be fill cant be blank"
                })
            }
            if(validator.isNumeric(name)){
                return res.status(400).json({
                    Success: false,
                    Message: "Name cannot be numbers"
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
            if(validator.isNumeric(phone)== false){
                return res.status(400).json({
                    Success: false,
                    message: "Invalid phone number format",
                    description: "phone number can not be characters"
                })
            }
            if(validator.isEmpty(address)){
                return res.status(400).json({
                    Success: false,
                    Message: "Oops address is Required",
                    Description: "Address must be fill cant be blank"
                })
            }
            if(validator.isNumeric(address)){
                return res.status(400).json({
                    Success: false,
                    message: "Address cannot be numbers",
                    description: "Address field must be provide with characters or Alpha-numberic"
                })
            }
            if(validator.isEmpty(state)){
                return res.status(400).json({
                    Success: false,
                    Message: "Oops state is Required",
                    Description: "state must be fill cant be blank"
                })
            }
            if(validator.isNumeric(state)){
                return res.status(400).json({
                    Success: false,
                    message: "State cannot be numbers",
                    description: "State field must be provide with characters or Alpha-numberic"
                })
            }
            if(validator.isEmpty(lga)){
                return res.status(400).json({
                    Success: false,
                    Message: "Oops Email is Required",
                    Description: "Email must be fill cant be blank"
                })
            }
            if(validator.isNumeric(lga)){
                return res.status(400).json({
                    Success: false,
                    message: "LGA cannot be numbers",
                    description: "LGA field must be provide with characters or Alpha-numberic"
                })
            }
        try {

            
            const UserID = req.User.id
            const Transaction = await db.transaction();
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
        
            const HotelUUID = uuidv4()
            const registerHotels = await Hotels.create({
                id: HotelUUID,
                users_id: UserID,
                name: name,
                email: email,
                phone: phone,
                address: address,
                latitude: latitude,
                longitude: longitude,
                state: state, 
                lga: lga,
                is_deleted: false,
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
                is_deleted: false

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
            res.status(500).json({
                Success: false,
                Message: "Internal Server error ",
                Description: "Something went wrong possibly database error"
            })
                console.log(e) 
            }
        
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            msg: "The following request bodies are required: name, email, phone, password, address, state, lga etc"
        });
    }
}