const consoleFonts = require('../error/consoleFonts');

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.log(consoleFonts.error(error.message));
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = asyncHandler;