const EventHall = require('../../Models/EventHall')
const EventHall_Img = require('../../Models/EventHalls_img')
const { v4: uuidv4 } = require('uuid');
const db = require('../../config/db')
const multer = require('multer')
const validator = require('validator')


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
                
                
                const QueryEventHall = await EventHall.findOne({
                    where:{
                        email: req.body.email
                    }
                })
                if(QueryEventHall){
                    return res.status(400).json({
                        Success: false,
                        message: "Email already exists ",
                        description: "try registering with new email for the eventhall"
                    })
                }
                let userID = req.User.id
                const EventHallUUID = uuidv4()
                let frontimage = req.files.frontimage[0]
                let bimage = req.files.bimage[0]
                let logsrc = req.files.logsrc[0]
            
                const Transaction = await db.transaction()

                try {
                    const createEventHall = await EventHall.create({
                        id: EventHallUUID,
                        users_id: userID,
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
                        logsrc: logsrc.path
                    
                    })
                    {
                        transaction: Transaction
                    }
                    const EventImgUUID = uuidv4()
                    await EventHall_Img.create({
                        id: EventImgUUID,
                        eventhalls_id: EventHallUUID,
                        frontimage: frontimage.path,
                        bimage: bimage.path,
                        is_deleted: 0
    
                    }),
                    {
                        transaction:Transaction
                    }
                
                    await Transaction.commit();
                        return res.status(201).json({
                        msg: "Created Successfully"
                    })    
                } catch (error) {
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
