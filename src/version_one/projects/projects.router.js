const express = require('express');
const projectController = require('./projects.controller');
const auth = require('../../middlewares/auth.middleware');

const projectRouter = express.Router();

projectRouter.post('/create', auth, projectController.CreateProject);
projectRouter.get('/get', auth, projectController.GetProjects);
projectRouter.delete('/delete', auth, projectController.DeleteProject);

module.exports = projectRouter;