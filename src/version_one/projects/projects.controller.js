const projectModel = require('./projects.model');
const asyncHandler = require('../../utils/programming/asyncHandler');
const CustomError = require('../../utils/error/customError');
const consoleFonts = require('../../utils/error/consoleFonts');
const generateRandomChars = require('../../utils/random_generation/generateRandomChars');
const db = require('../../configurations/db_config');

module.exports = {
    CreateProject: asyncHandler(async (req, res) => {
        const { project_name } = req.body;
        const { _id } = req.user;

        if(!project_name) {
            throw new CustomError('Project Name is missing', 404);
        }

        const key = generateRandomChars(30);

        const project = await projectModel.create({
            project_name: project_name,
            user_id: _id,
            api_key: key
        });

        res.status(200).json({
            success: true,
            message: 'Project Created Successfully',
            project
        });
    }),
    GetProjects: asyncHandler(async (req, res) => {
        const { _id } = req.user;

        const projects = await projectModel.find({ user_id: _id });

        res.status(200).json({
            success: true,
            message: 'Got Projects Successfully',
            projects
        });
    }),
    DeleteProject: asyncHandler(async (req, res) => {
        const { _id } = req.body;

        if(!_id) {
            throw new CustomError('Project Id is Missing', 404);
        }

        await projectModel.findByIdAndDelete(_id);

        res.status(200).json({
            success: true,
            message: 'Project Deleted Successfully'
        });
    })
}