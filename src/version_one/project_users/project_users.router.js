const express = require('express');
const projectUserController = require('./project_users.controller');
const auth = require('../../middlewares/auth.middleware');
const verify_api_key = require('../../middlewares/verify_api_key.middleware');

const projectUserRouter = express.Router();

projectUserRouter.post('/create/collection', auth, verify_api_key, projectUserController.createUserCollection);
projectUserRouter.post('/add', auth, verify_api_key, projectUserController.AddUserToCollection);
projectUserRouter.get('/get/users', auth, verify_api_key, projectUserController.GetCollectionUsers);
projectUserRouter.get('/get/user', auth, verify_api_key, projectUserController.GetUserInCollection);
projectUserRouter.post('/update', auth, verify_api_key, projectUserController.UpdateUserInCollection);
projectUserRouter.delete('/delete', auth, verify_api_key, projectUserController.DeleteUserInCollection);

module.exports = projectUserRouter;