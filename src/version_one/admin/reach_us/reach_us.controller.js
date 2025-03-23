const reachUsModel = require('./reach_us.model');
const asyncHandler = require('../../../utils/programming/asyncHandler');
const customError = require('../../../utils/error/customError');

module.exports = {
    sendQuery: asyncHandler(async (req, res) => {
        const { name, email, phone, message } = req.body;

        await reachUsModel.create({
            name,
            email,
            phone,
            message
        });

        res.status(200).json({
            success: true,
            message: 'Query Added Successfully'
        });
    })
}

