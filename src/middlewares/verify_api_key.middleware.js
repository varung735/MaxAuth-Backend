const projectModel = require('../version_one/projects/projects.model');
const asyncHandler = require('../utils/programming/asyncHandler');
const CustomError = require('../utils/error/customError');

const verify_api_key = asyncHandler(async (req, res, next) => {
    const { api_key } = req.query;

    if(!api_key) {
        throw new CustomError('Api Key is Missing', 404);
    }

    const project = await projectModel.findOne({ api_key });

    if(project === null) {
        throw new CustomError('Api key Invalid', 403);
    }

    req.project = project;

    next();
});

module.exports = verify_api_key;