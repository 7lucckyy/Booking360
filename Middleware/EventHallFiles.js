const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'Uploads');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + '' + file.originalname)
    },
    fileFilter: function(req, file, cb){
        if(file.minetype === 'image/png' || file.minetype === 'image/jpg' || file.minetype === 'image/peg'){
            cb(null, true)
        }else{
            cb(null, false, "Invalid File format Upload Image")
        }
    }
})



const EventFileUpload = multer({
    storage: storage,
    limits: {
       fileSize: 1024 * 1024 * 5 
    }
    
}).fields([{name: 'frontimage'}, {name: 'bimage'}, {name: 'logosrc'}])


module.exports = EventFileUpload;

