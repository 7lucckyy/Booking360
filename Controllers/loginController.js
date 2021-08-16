const db = require('../config/db');
const Bcrypt = require('bcryptjs');
const Users = require('../Models/Users');
const jwt = require('jsonwebtoken')


module.exports = async(req, res)=>{
    try {
        let Email = req.body.email;
        let Password = req.body.password;
        console.log(Email);
        const AuthencateUser = await Users.findOne({
            where: {
                
                email: Email,
            }
        })
        if(AuthencateUser.is_deleted != 0){
            return res.status(404).json({
                success: false,
                message: "Oops User not found ",
                description: "kindly provide valid login credential"
            })
        }

        if(!AuthencateUser){
            return res.status(400).json({
                success: false,
                message: "Invalid Login credential"
            })
        }

        const AuthHashpassword = await Bcrypt.compare(Password, AuthencateUser.password)
        if(AuthHashpassword == false){
            return res.status(400).json({
                success: false,
                message: "Invalid login credential",
                description: "Provide login credential"
            })
        }

        

        const AccessToken = (UserID) =>{
            return jwt.sign(UserID, process.env.JWT_SECRET_KEY, {expiresIn: '1hr'});
        }

        const Token = AccessToken({ UserID: AuthencateUser.id });



        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            data: {
                Token
            }
        })
    } catch (e) {
        console.log(e);
    }
}