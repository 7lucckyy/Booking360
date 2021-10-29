const Authentication = require("../Models/Authentication");
const UserType = require("../Models/UserType");

module.exports = async(req, res, next) => {
    try {
        const AuthenticationQueryResult = await Authentication.findOne({
            where: {
                id: req.User.id,
                is_deleted: 0
            },
            include: [{
                model: UserType
            }]
        });
        if (AuthenticationQueryResult.user_type.name != 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Your are unauthorized to perform this action'
            });
        }
        next();
    } catch (e) {
        return res.status(500).json({
            successs: false,
            message: 'Something went wrong. Try again'
        });
    }
}