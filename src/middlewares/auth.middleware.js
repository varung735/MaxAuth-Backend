const jwt = require('jsonwebtoken');
const env_config = require('../configurations/env_config');
const CustomError = require('../utils/error/customError');
const consoleFonts = require('../utils/error/consoleFonts');
const asyncHandler = require('../utils/programming/asyncHandler');

const auth = (req, res, next) => {
    let token;

    if(req.cookies.token){
        token = req.cookies.token;
    } 
    else if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if(!token) {
        res.status(403).json({
            success: false,
            message: 'Token not Found'
        });
        throw new CustomError('Token not Found', 404);
    }
    
    try{
        const decodedToken = jwt.verify(token, env_config.jwt_secret);
        req.user = decodedToken;

        next();
    }
    catch(error) {
        res.status(403).json({
            success: false,
            message: error.message
        });
        console.log(consoleFonts.error(error));
        throw new CustomError('Token Invalid or Malformed', 403);
    }
};

module.exports = auth;