const db = require('../config/db')
const EventHall = require('../Models/EventHall')
const EventHall_Img = require('../Models/EventHalls_img')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const validator = require('validator')
const Users = require('../Models/Users');



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
                
                let userID = req.User.id

                const QueryAuthHall = await EventHall.findAll({
                    wehere: {
                        users_id: userID,
                        is_deleted: 0
                    },inculde:[{
                        model: EventHall_Img
                    }]
                })

                if(!QueryAuthHall){
                    return res.status(404).json({
                        Success: false,
                        message: "EventHall not found",

                    })
                }
                
                
                let frontimage = req.files.frontimage[0]
                let bimage = req.files.bimage[0]
                let logsrc = req.files.logsrc[0]
                
                const EventHallUUID = uuidv4()
                

                const Transaction = await db.transaction()

                try {
                    
                        QueryAuthHall.id = EventHallUUID
                        QueryAuthHall.users_id = userID
                        QueryAuthHall.name = name
                        QueryAuthHall.email = email
                        QueryAuthHall.phone = phone
                        QueryAuthHall.address = address
                        QueryAuthHall.latitude = latitude
                        QueryAuthHall.longitude = longitude
                        QueryAuthHall.state = state
                        QueryAuthHall.lga = lga
                        QueryAuthHall.is_deleted = 0
                        QueryAuthHall.description = description
                        QueryAuthHall.logsrc = logsrc.path
                    
                    
                    {
                        transaction: Transaction
                    }
                    const EventImgUUID = uuidv4()

                    
                    QueryAuthHall.id = EventImgUUID
                    QueryAuthHall.eventhalls_id = EventHallUUID
                    QueryAuthHall.frontimage = frontimage.path
                    QueryAuthHall.bimage = bimage.path
                    QueryAuthHall.is_deleted = 0
    
                    await QueryAuthHall.save({
                        transaction: Transaction
                    })
                
                    await Transaction.commit();
                        return res.status(201).json({
                        msg: "EventHall updated successfully"
                    })    
                } catch (e) {
                    await Transaction.rollback()                  
                    return res.status(500).json({
                        Success: false, 
                        message: "Internal Server error",
                        description: "Something went wrong"
                    })  
                }
            } catch (e) {

               console.log(e);
               return res.status(500).json({
                Success: false, 
                message: "Internal Server error",
                description: "Something went wrong"
            })
            }
    } catch (e) {
        console.log(e);
       return res.status(400).json({
           Success: false,
           message: "The following bodies are requred name, email, address, state, lga, etc"
       }) 
    }
}
