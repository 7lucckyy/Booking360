const db = require('../config/db');
const Rooms = require('../Models/Rooms');
const Rooms_imgs = require('../Models/Rooms_img');
const validator = require('validator');
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const RoomFileUpload = require('../Middleware/RoomsFileUpload');

module.exports = async(req, res) =>{
   
    try {
      const Transaction = await db.transaction();

       try {
         let RoomUUID = uuidv4();
         let {hotels_id, name, price, quantity, description, } = req.body;
         
         
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
         if(validator.isEmpty(price)){
            return res.json({
               Success: false,
               Message: "price is required",
               Description: "Provide price"
            })
         }

         
         const createRoom = await Rooms.create({
             id: RoomUUID,
             hotels_id: hotels_id,
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
    }  
  }