const db = require('../config/db');
const Rooms = require('../Models/Rooms');
const Rooms_imgs = require('../Models/Rooms_img');
const validator = require('validator');
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const RoomFileUpload = require('../Middleware/RoomsFileUpload');
const Users = require('../Models/Users');
const Hotels = require('../Models/Hotels');

module.exports = async(req, res) =>{
   
    try {
         
         let {name, price, quantity, description } = req.body;

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
      
       try {
               let userID = req.User.id
               
               const QueryUser = await Hotels.findOne({
                  where: {
                     users_id: userID,
                     is_deleted: false
                  }
               })
               let HotelID = QueryUser.id

               
               

                let fimage = req.files.fimgsrc[0]
                let bimage = req.files.bimgsrc[0]
                let image = req.files.image[0]

                const Transaction = await db.transaction();
               try {
                const QueryHotelAuth = await Rooms.findOne({
                   where:{
                       hotels_id: HotelID
                   }
               })


               const QueryRoomImgAuth = await Rooms_imgs.findOne({
                  where:{
                      rooms_id: QueryHotelAuth.id
                  }
              })
               
               
                QueryHotelAuth.name = name
                QueryHotelAuth.price = price
                QueryHotelAuth.quantity = quantity
                QueryHotelAuth.description = description
                
         
               {
                  transaction: Transaction
               }

               QueryRoomImgAuth.fimage = fimage.path
               QueryRoomImgAuth.bimage = bimage.path
               QueryRoomImgAuth.image = image.path
               


               await QueryHotelAuth.save({
                  transaction: Transaction
               })

               await Transaction.commit();
               return res.status(201).json({
                  Message: "Updated Created Successfully"
               })
               } catch (e) {
                await Transaction.rollback();
                console.log(e);
               }
               
            } catch (e) {
               
               console.log(e);
            }
      
      
    } catch (e) {
       console.log(e);
       return res.status(400).json({
         msg: "The following request bodies are required: name, email, phone,password"
     }); 
  }
}