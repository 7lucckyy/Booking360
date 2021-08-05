const db = require('../config/db');
const Users = require('../Models/Users');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');


module.exports = async (req, res)=>{
    try {

        let { name, email, phone, password} = req.body;
        let Haspassword = await bcrypt.hash(password, 10);
        const registerUser = await Users.create({
            id: uuidv4(),
            name: name,
            email: email,
            phone: phone,
            password: Haspassword,
            is_deleted: 0
        })
        return res.status(201).json({
            msg: "Created Successfully"
        })
    } catch (e) {
        console.log(e)
    }
}
