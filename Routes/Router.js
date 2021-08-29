
const express = require('express')
const postHotelController = require('../Controllers/postHotelController')
const uploads = require('../Middleware/fileUploads');
const postUserController = require('../Controllers/postUserController')
const EventHallFiles = require('../Middleware/EventHallFiles')


const bodyParser = require('body-parser');
const postRoomController = require('../Controllers/postRoomController');
const RoomFileUpload = require('../Middleware/RoomsFileUpload');
const loginController = require('../Controllers/loginController');
const getHotelController = require('../Controllers/getHotelController');
const VerifyJWTtoken = require('../Auth/VerifyJWTtoken');


const router = express.Router()
router.use(bodyParser.json())



router.post('/createHotel',  [VerifyJWTtoken],uploads, postHotelController)
router.post('/register', postUserController)
router.post('/createRoom', [VerifyJWTtoken], RoomFileUpload, postRoomController);
router.post('./createEventHall', [VerifyJWTtoken], postEventHall, EventHallFiles)
router.post('/login', loginController)
router.get('/getHotel', getHotelController)


module.exports = router;
