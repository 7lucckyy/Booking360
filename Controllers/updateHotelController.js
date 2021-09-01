const db = require('../config/db');
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
            const UserID = req.User.id
            
            const AuthQueryHotel =  await Hotels.findOne({
            where:{
                users_id: UserID
            }
            })
            if(!AuthQueryHotel){
                return res.status(404).json({
                Success: false,
                Message: "Hotel does not exist",
                Description: "Hotel Email not exist on the Database"
            })
            }

            let Fimage = req.files.fimgsrc[0]
            let bimgsrc = req.files.bimgsrc[0]
            let logosrc = req.files.logosrc[0]
        

            const Transaction = await db.transaction();
        try {
            const HotelUUID = uuidv4()
            const HotelImgUUID = uuidv4()
        
            AuthQueryHotel.id = HotelUUID
            AuthQueryHotel.users_id = UserID
            AuthQueryHotel.name = name
            AuthQueryHotel.email = email
            AuthQueryHotel. phone= phone
            AuthQueryHotel.address = address
            AuthQueryHotel.latitude = latitude
            AuthQueryHotel.longitude = longitude,
            AuthQueryHotel.state = state 
            AuthQueryHotel.lga = lga
            AuthQueryHotel.is_deleted = 0
            AuthQueryHotel.description = description
            
            {
                transaction:Transaction
            }
        
            
            AuthQueryHotel.id = HotelImgUUID
            AuthQueryHotel.hotels_id = HotelUUID
            AuthQueryHotel.fimgsrc = Fimage.path
            AuthQueryHotel.bimgsrc = bimgsrc.path
            AuthQueryHotel.logosrc = logosrc.path
            AuthQueryHotel.is_deleted = 0

            
            await AuthQueryHotel.save({
                
                transaction:Transaction
                
            })
            await Transaction.commit();
                return res.status(201).json({
                msg: "Updated Successfully"
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