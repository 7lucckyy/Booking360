const ReasonForLeave = require("../../Models/ReasonForLeave");
module.exports = async(req, res) => {
    try {

        const Data = [];
        let ReasonForLeaveQueryResult = await ReasonForLeave.findAll({
            where: {
                is_deleted: 0
            }
        });

        ReasonForLeaveQueryResult.forEach(element => {
            Data.push({
                id: element.id,
                name: element.name,
            });
        });

        return res.status(200).json({
            success: true,
            message: 'Retrived the List of Reason for Leave',
            data: Data
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}