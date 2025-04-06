const express = require('express');
const projectController = require('./projects.controller');
const auth = require('../../middlewares/auth.middleware');
const verify_api_key = require('../../middlewares/verify_api_key.middleware');

const projectRouter = express.Router();

projectRouter.post('/create', auth, projectController.CreateProject);
projectRouter.post('/add/schema', auth, projectController.AddUserSchemaToProject);
projectRouter.get('/get', auth, projectController.GetProjects);
projectRouter.get('/get/project', auth, projectController.GetProject);
projectRouter.delete('/delete', auth, projectController.DeleteProject);
projectRouter.get('/get/api_key/project', auth, verify_api_key, projectController.getProjectFromApiKey);

module.exports = projectRouter;