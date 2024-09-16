const mongoose = require('mongoose');

const projectModel = new mongoose.Schema(
    {
        project_name: {
            type: String,
            required: [true, 'Project Name is Required']
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        api_key: {
            type: String,
            required: [true, 'api key is required'],
            unique: [true, 'api key should be unique']
        },
        required_keys: {
            type: Array
        },
        project_schema: {
            type: Object
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Project', projectModel);