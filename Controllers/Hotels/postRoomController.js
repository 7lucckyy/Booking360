const db = require('../../config/db');
const Rooms = require('../../Models/Rooms');
const Rooms_imgs = require('../../Models/Rooms_img');
const validator = require('validator');
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const RoomFileUpload = require('../../Middleware/RoomsFileUpload');
const Hotels = require('../../Models/Hotels');

module.exports = async(req, res) =>{
   
    try {
         
         let {name, price, quantity, description, } = req.body;

         let fimage = req.files.fimgsrc[0]
         let bimage = req.files.bimgsrc[0]
         let image = req.files.image[0]
         
         if(validator.isEmpty(name)){
            return res.json({
               Success: false,
               Message: "name field is required",
               Description: "name field cannot be blank"
            })
         }
         if(validator.isNumeric(name)){
            return res.status(400).json({
               Success: false,
               message: "Name cannot be numbers",
               description: "Kindly fill with characters"
            })
         }
         if(validator.isEmpty(price)){
            return res.json({
               Success: false,
               Message: "price is required",
               Description: "Provide price"
            })
         }
         const Transaction = await db.transaction();

       try {
          
               let userID = req.User.id
               const QueryUser = await Hotels.findOne({
                  where: {
                     users_id: userID
                  },
               })
               
               if(!QueryUser){
                  return res.status(400).json({
                     Success: false,
                     Message: "UnAuthorized to access this",
                     Description: "You not authorised to perform this action"
                  })
               }
               let RoomUUID = uuidv4();
               const createRoom = await Rooms.create({
                  id: RoomUUID,
                  hotels_id: QueryUser.id,
                  name: name,
                  price: price,
                  quantity: quantity,
                  description: description,
                  is_deleted: 0
         
               }) 
               {
                  transaction: Transaction
               }
               await Rooms_imgs.create({
                  id: uuidv4(),
                  rooms_id: RoomUUID,
                  fimage: fimage.path,
                  bimage: bimage.path,
                  image: image.path,
                  is_deleted: 0


               })
               {
                  transaction: Transaction
               }

               await Transaction.commit();
               return res.status(201).json({
                  Message: "Room Created Successfully"
               })
            } catch (e) {
               await Transaction.rollback();
               console.log(e);
            }
      
      
    } catch (e) {
       console.log(e);
       return res.status(400).json({
         msg: "The following request bodies are required: name, email, phone,password"
     }); 
  }
}