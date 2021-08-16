require('dotenv').config();
const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./config/db');
const postUserController = require('./Controllers/postUserController');
const postHotelController = require('./Controllers/postHotelController');
const router = require('./Routes/Router');



//Setup Express app
const app = express();

app.use('/api/v1', router)

app.use(morgan())

app.use(express.urlencoded({extended: true})); 
app.use(express.json());






//Database connection
try {
    db.authenticate();
    console.log('Database Connected Successfully');
} catch (e) {
    console.log('Something went wrong');
    console.log(e);
}




app.listen(20000);