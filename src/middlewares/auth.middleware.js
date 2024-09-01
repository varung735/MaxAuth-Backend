const jwt = require('jsonwebtoken');
const env_config = require('../configurations/env_config');
const CustomError = require('../utils/error/customError');

const auth = () => {
    let token;

    if(req.cookies.token || req.headers.authorization.startsWith("Bearer")){
        token = req.cookies.token || req.headers.authorization.split(' ')[1];
    }

    if(!token){
        throw new CustomError('Token not Found', 404);
    }
    
    try{
        const decodedToken = jwt.verify(token, env_config.jwt_secret);
        req.user = decodedToken;

        next();
    }
    catch(error) {
        console.log(error);
    }
};

module.exports = auth;