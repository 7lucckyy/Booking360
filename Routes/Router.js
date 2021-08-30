
const express = require('express')
const postHotelController = require('../Controllers/postHotelController')
const uploads = require('../Middleware/fileUploads');
const postUserController = require('../Controllers/postUserController')
const EventHallFiles = require('../Middleware/EventHallFiles')
const postEventHall = require('../Controllers/postEventHall')

const bodyParser = require('body-parser');
const postRoomController = require('../Controllers/postRoomController');
const RoomFileUpload = require('../Middleware/RoomsFileUpload');
const loginController = require('../Controllers/loginController');
const getHotelController = require('../Controllers/getHotelController');
const VerifyJWTtoken = require('../Auth/VerifyJWTtoken');
const updateEventHall = require('../Controllers/updateEventHall');
const updateHotelController = require('../Controllers/updateHotelController');
const updateRoomController = require('../Controllers/updateRoomController');


const router = express.Router()
router.use(bodyParser.json())



router.post('/createHotel',  [VerifyJWTtoken],uploads, postHotelController)
router.put('/updateHotel', [VerifyJWTtoken],uploads, updateHotelController)
router.post('/register', postUserController)
router.post('/createRoom', [VerifyJWTtoken], RoomFileUpload, postRoomController);
router.put('/updateRoom', [VerifyJWTtoken], RoomFileUpload, updateRoomController)
router.post('/createEventHall', [VerifyJWTtoken], EventHallFiles, postEventHall)
router.put('/updateEventHall', [VerifyJWTtoken], EventHallFiles, updateEventHall)
router.post('/login', loginController)
router.get('/getHotel', getHotelController)


module.exports = router;
