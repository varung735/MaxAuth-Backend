const { db } = require('../../configurations/db_config');
const asyncHandler = require('../../utils/programming/asyncHandler');
const CustomError = require('../../utils/error/customError');
const customError = require('../../utils/error/consoleFonts');
const { ObjectId } = require('mongodb');

module.exports = {
    createUserCollection: asyncHandler(async (req, res) => {
        const { userDetails, requiredFields } = req.body;
        const { _id, project_name } = req.project;

        await db.createCollection(`${project_name}-${_id}`, {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: requiredFields,
                    properties: userDetails
                }
            }
        });

        res.status(200).json({
            success: true,
            message: 'Collection created Successfully'
        });
    }),
    GetCollectionUsers: asyncHandler(async (req, res) => {
        const { _id, project_name } = req.project;

        const users = await db.collection(`${project_name}-${_id}`).find().toArray();

        res.status(200).json({
            success: true,
            message: 'Got All Users Successfully',
            users
        })
    }),
    GetUserInCollection: asyncHandler(async (req, res) => {
        const { userId } = req.query;
        const { _id, project_name } = req.project;

        const user = await db.collection(`${project_name}-${_id}`).findOne({ _id: new ObjectId(userId) });

        res.status(200).json({
            success: true,
            message: 'Got User Successfully',
            user
        });
    }),
    AddUserToCollection: asyncHandler(async (req, res) => {
        const { _id, project_name } = req.project;

        await db.collection(`${project_name}-${_id}`).insertOne(req.body);

        res.status(200).json({
            success: true,
            message: 'User Added Successfully'
        });
    }),
    UpdateUserInCollection: asyncHandler(async (req, res) => {
        const { userId, update } = req.body;
        const { _id, project_name } = req.project;

        await db.collection(`${project_name}-${_id}`).findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $set: update }
        );

        res.status(200).json({
            success: true,
            message: 'User Updated Successfully'
        });
    }),
    DeleteUserInCollection: asyncHandler(async (req, res) => {
        const { userId } = req.body;
        const { _id, project_name } = req.project;

        const user = await db.collection(`${project_name}-${_id}`).findOneAndDelete({ _id: new ObjectId(userId) });

        if(user === null){
            throw new CustomError('User Not Found', 404);
        }
        
        res.status(200).json({
            success: true,
            message: 'User Deleted Successfully'
        });
    })
}