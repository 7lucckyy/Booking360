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
         
         let {name, price, quantity, description, } = req.body;

         
         
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
                     users_id: userID
                  },include:[{
                      model: Rooms
                  }]
               })
               let HotelID = QueryUser.id

               const QueryHotelAuth = await Rooms.findOne({
                   where:{
                       hotels_id: HotelID
                   }
               })

               const QueryRoomAuth = await Rooms.findOne({
                   where:{
                       id: QueryHotelAuth.id
                   }
               })
               await QueryRoomAuth.update({
                   is_deleted: 1
               })
               
                let fimage = req.files.fimgsrc[0]
                let bimage = req.files.bimgsrc[0]
                let image = req.files.image[0]

                const Transaction = await db.transaction();
               try {
                
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