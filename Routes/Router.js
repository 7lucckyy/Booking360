
const express = require('express')
const postHotelController = require('../Controllers/postHotelController')
const uploads = require('../Middleware/fileUploads');



const bodyParser = require('body-parser')


const router = express.Router()
router.use(bodyParser.json())



router.post('/createHotel',  uploads, postHotelController)



module.exports = router;
