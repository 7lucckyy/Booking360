const db = require('../../config/db');
const Users = require('../../Models/Users');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const validator = require('validator')



module.exports = async (req, res)=>{
    try {
        let { name, email, phone, password} = req.body;


            if(validator.isEmpty(name)){
                return res.status(400).json({
                    Success: false,
                    Message: "Oops Name fill is required",
                    Description: "Name cannot be blank "
                })
            }
            if(validator.isNumeric(name)){
                return res.status(400).json({
                    Success: false,
                    Message: "name address can not be numbers",
                    Description: "name address cannot be "
                })  
              }
            if(validator.isEmpty(email)){
                return res.status(400).json({
                    Success: false,
                    Message: "Oops Email Address is required",
                    Description: "Email fill cannot be blank"
                })
            }
            
            if(validator.isEmail(email)==false){
                return res.status(400).json({
                    Successs: false,
                    Message: "Invalid email fomart",
                    Description: "Email address e.g exmaple@email.com"
                })
            }
            if(validator.isEmpty(phone)){
                return res.status(400).json({
                    Success: false,
                    Message: "Phone number is required",
                    Description: "Phone number cant be blank" 
                })
            }
            if(phone.length < 11){
                return res.status(400).json({
                    Success: false,
                    message: "Invalid phone number",
                    Description: "Phone can not be less than 11 digits"
                })
            }
            
            if(validator.isEmpty(password)){
                return res.status(400).json({
                    Success: false,
                    Message: "Password is required",
                    Description: "You must provide password"
                })
            }
            if(password.length < 8){
                return res.status(400).json({
                    Success: false,
                    Message: "Password can not be less 8 characters",
                    Description: "Password length is to short"
                })
            }
            let Haspassword = await bcrypt.hash(password, 10);
            const Transaction = await db.transaction()
        try {
            


            const registerUser = await Users.create({
                id: uuidv4(),
                name: name,
                email: email,
                phone: phone,
                password: Haspassword,
                is_deleted: 0
            })
            {
                transaction: Transaction
            }
            await Transaction.commit()
            return res.status(201).json({
            msg: "Created Successfully"
            })
        } catch (e) {
            Transaction.rollback()
            console.log(e);
            return res.status(500).json({
                msg: "Could not complete operation"
            });    
        }
        
    } catch (e) {
        return res.status(400).json({
            msg: "The following request bodies are required: name, email, phone,password"
        });
    }
}
