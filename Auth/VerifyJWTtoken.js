const jwt = require('jsonwebtoken')

module.exports = async(req, res, next)=>{
    try {
        let AuthorizationToken = req.headers.authorization;

        if (AuthorizationToken == undefined || AuthorizationToken == null) {
            return res.status(401).json({
                success: true,
                message: 'Access Token is required',
                description: 'Try Logging Again to get Token'
            });
        }
        AuthorizationToken = AuthorizationToken.split(' ')[1];

        let User = await jwt.verify(AuthorizationToken, process.env.SECRET_KEY);

        let UserObj = {
            id: User.UserID
        }

        req.User = UserObj;

        next();


    } catch (e) {
        console.log(e);
        return res.status(401).json({
            success: false,
            message: "Token has been tempered",
            description: "Login to get new token"
        })
    }
}
