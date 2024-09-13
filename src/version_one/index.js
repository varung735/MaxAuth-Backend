const express = require('express');
const userRouter = require('./users/user.router');
const projectRouter = require('./projects/projects.router');
const projectUserRouter = require('./project_users/project_users.router');

const version_one_router = express.Router();

version_one_router.use('/users', userRouter);
version_one_router.use('/projects', projectRouter);
version_one_router.use('/project_users', projectUserRouter);

module.exports = version_one_router;