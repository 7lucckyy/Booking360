const Validator = require('validator');
const DbConnection = require('../../Config/Db');
const ReasonForLeave = require('../../Models/ReasonForLeave');

module.exports = async(req, res) => {
    try {

        if (Validator.isUUID(req.params.id) == false) {
            return res.status(400).json({
                success: false,
                message: 'Reason For Leave ID must be a valid UUID'
            });
        }

        let ReasonForLeaveId = req.params.id;

        //Check if the User Type is valid
        try {
            //Check if the Email Address already Exist in the Platform
            let ReasonForLeaveQueryResult = await ReasonForLeave.findOne({
                where: {
                    id: ReasonForLeaveId,
                    is_deleted: 0
                }
            });


            if (!ReasonForLeaveQueryResult) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Reason For Leave ID',
                });
            }


            const Transaction = await DbConnection.transaction();

            try {

                ReasonForLeaveQueryResult.is_deleted = 1;
                await ReasonForLeaveQueryResult.save({
                    transaction: Transaction
                });

                await Transaction.commit();
                return res.status(200).json({
                    success: true,
                    message: 'Reason For Leave was deleted successfully',
                });
            } catch (e) {
                await Transaction.rollback();
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Try again',
                    description: 'Could not Complete the Operation'
                });
            }

        } catch (e) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Try again',
                description: 'Could not Complete the Operation'
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again',
        });
    }
}