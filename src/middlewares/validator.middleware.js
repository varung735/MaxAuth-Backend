const asyncHandler = require('../utils/programming/asyncHandler');
const CustomError = require('../utils/error/customError');
const projectModel = require('../version_one/projects/projects.model');

const validator = asyncHandler(async (req, res, next) => {
    const { _id } = req.project;
    const body = req.body;

    const project = await projectModel.findById(_id, 'required_keys project_schema');

    const keys = Object.keys(body).sort();
    const projectKeys = project.required_keys.sort();
    const projectSchema = project.project_schema;

    projectKeys.map((item, index) => {
        if(item !== keys[index]){
            throw new CustomError(`${item} is Missing`, 404);
        }
    });

    keys.map((item) => {
        if(typeof(body[`${item}`]) !== projectSchema[`${item}`].bsonType){
            throw new CustomError(`${item} should be of type ${projectSchema[`${item}`].bsonType}`);
        }
    });

    next();    
});

module.exports = validator;