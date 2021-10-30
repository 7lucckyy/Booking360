const Validator = require('validator');
const Position = require('../../Models/Position');
const UUID = require('uuid');
const ReasonForLeave = require('../../Models/ReasonForLeave');
module.exports = async(req, res) => {
    try {
        let ReasonForLeaveInput = req.body.reason_for_leave;

        if (Validator.isEmpty(ReasonForLeaveInput)) {
            return res.status(400).json({
                success: false,
                message: 'Reason For Leave is required',
                description: 'Reason For Leave has to be supplied'
            });
        }

        //Check if the Qualification Already Exist in the Database
        try {
            ReasonForLeaveInput = ReasonForLeaveInput.toUpperCase();

            let ReasonForLeaveQueryResult = await ReasonForLeave.findOne({
                where: {
                    name: ReasonForLeaveInput,
                    is_deleted: 0,
                }
            });

            if (ReasonForLeaveQueryResult) {
                return res.status(400).json({
                    success: false,
                    message: 'This Reason For Leave already exists in the database',
                    description: 'Try changing the position'
                });
            }

            const ReasonForLeaveUUID = UUID.v4();

            await ReasonForLeave.create({
                id: ReasonForLeaveUUID,
                name: ReasonForLeaveInput,
                is_deleted: 0,
            });

            return res.status(201).json({
                success: true,
                message: 'Reason For Leave was added successfully'
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Try again',
                description: 'Could not complete the operation'
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again',
            description: 'The Following request bodies are required. reason_for_leave'
        });
    }
}