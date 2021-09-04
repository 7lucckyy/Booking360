
const express = require('express')
const postHotelController = require('../Controllers/Hotels/postHotelController')
const uploads = require('../Middleware/fileUploads');
const postUserController = require('../Controllers/Users/postUserController')
const EventHallFiles = require('../Middleware/EventHallFiles')
const postEventHall = require('../Controllers/EventHall/postEventHall')

const bodyParser = require('body-parser');
const postRoomController = require('../Controllers/Hotels/postRoomController');
const RoomFileUpload = require('../Middleware/RoomsFileUpload');
const loginController = require('../Controllers/Users/loginController');
const getHotelController = require('../Controllers/getHotelController');
const VerifyJWTtoken = require('../Auth/VerifyJWTtoken');
const updateEventHall = require('../Controllers/EventHall/updateEventHall');
const updateHotelController = require('../Controllers/Hotels/updateHotelController');
const updateRoomController = require('../Controllers/Hotels/updateRoomController');


const router = express.Router()
router.use(bodyParser.json())



router.post('/Hotel',  [VerifyJWTtoken],uploads, postHotelController)
router.put('/Hotel', [VerifyJWTtoken],uploads, updateHotelController)
router.post('/register', postUserController)
router.post('/Room', [VerifyJWTtoken], RoomFileUpload, postRoomController);
router.put('/Room', [VerifyJWTtoken], RoomFileUpload, updateRoomController)
router.post('/EventHall', [VerifyJWTtoken], EventHallFiles, postEventHall)
router.put('/EventHall', [VerifyJWTtoken], EventHallFiles, updateEventHall)
router.post('/login', loginController)
router.get('/getHotel', getHotelController)


module.exports = router;
