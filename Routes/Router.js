
const express = require('express')
const postHotelController = require('../Controllers/postHotelController')
const uploads = require('../Middleware/fileUploads');
const postUserController = require('../Controllers/postUserController')



const bodyParser = require('body-parser');
const postRoomController = require('../Controllers/postRoomController');
const RoomFileUpload = require('../Middleware/RoomsFileUpload');
const loginController = require('../Controllers/loginController');
const getHotelController = require('../Controllers/getHotelController');


const router = express.Router()
router.use(bodyParser.json())



router.post('/createHotel',  uploads, postHotelController)
router.post('/register', postUserController)
router.post('/createRoom', RoomFileUpload, postRoomController);
router.post('/login', loginController)
router.get('/getHotel', getHotelController)


module.exports = router;
