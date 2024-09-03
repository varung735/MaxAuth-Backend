const userModel = require('./users.model');
const asyncHandler = require('../../utils/programming/asyncHandler');
const CustomError = require('../../utils/error/customError');

module.exports = {
    Login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if(!email || !password) {
            throw new CustomError(404, 'Email or Password Cannot be Missing');
        }

        const user = await userModel.findOne({ email }).select('+password');

        if(user === null) {
            throw new CustomError(404, 'User Not Found');
        }

        const isPasswordMatch = user.comparePassword(user.password);

        if(isPasswordMatch) {
            let token = await user.generateJwtToken();
            user.password = undefined;

            res.status(200).json({
                success: true,
                message: 'User LoggedIn Successfully',
                token,
                user
            });
        }
        else{
            throw new CustomError(403, 'Invalid Credentials');
        }
    }),
    Signup: asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            throw new CustomError(404, 'Name, Email or Password Cannot be Missing');
        }

        const user = await userModel.create({
            name,
            email,
            password
        });

        user.password = undefined;

        res.status(200).json({
            success: true,
            message: 'User Signed Up Successfully',
            user
        });
    }),
    VerifyEmail: asyncHandler(async (req, res) => {
        const { email } = req.body;

        
    }),
    ForgetPassword: asyncHandler(async (req, res) => {
        const { email } = req.body;
    })
}