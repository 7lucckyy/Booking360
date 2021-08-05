const db = require('../config/db');
const Rooms = require('../Models/Rooms');
const Rooms_imgs = require('../Models/Rooms_img');
const validator = require('validator');


module.exports = async(req, res) =>{
   const Transaction = await db.transaction();
    try {
      let {rooms_id, name, price, quantity, description, is_deleted } = req.body;
      let RoomUUID = uuidv4();
      const createRoom = await Rooms.create({
          id: RoomUUID,
          rooms_id: rooms_id,
          name: name,
          price: price,
          quantity: quantity,
          description: description,
          is_deleted: 0
  
       }) 
       {
          transaction: transaction
       }
      
    } catch (e) {
       console.log(e);
    }  
  }