"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.resetPassword = exports.forgotPassword = exports.restrictTo = exports.protect = exports.logout = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const usersModel_1 = __importDefault(require("../models/usersModel"));
const AppError_1 = require("../utils/AppError");
const catchAsync_1 = require("../utils/catchAsync");
const email_1 = require("../utils/email");
//--------------------------------------------//
//---------------SIGNUP ----------------//
//-------------------------------------------//
exports.signup = catchAsync_1.catchAsync(async (req, res, next) => {
    const { name, email, password, passwordConfirm, role } = req.body;
    const newUser = await usersModel_1.default.create({
        name,
        email,
        password,
        passwordConfirm,
        role,
    });
    createAndSendJWTToken(newUser, 201, res);
});
//--------------------------------------------//
//---------------LOGIN ----------------//
//-------------------------------------------//
exports.login = catchAsync_1.catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError_1.AppError('Please provide email or password', 400));
    }
    const user = await usersModel_1.default.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError_1.AppError('Email or Password is incorrect', 400));
    }
    createAndSendJWTToken(user, 201, res);
});
//--------------------------------------------//
//---------------LOGIN ----------------//
//-------------------------------------------//
const logout = (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
};
exports.logout = logout;
//--------------------------------------------//
//---------------PROTECT ROUTES----------------//
//-------------------------------------------//
exports.protect = catchAsync_1.catchAsync(async (req, res, next) => {
    let token = '';
    if (!process.env.JWT_SECRET) {
        throw new Error('process.env.JWT_SECRET not defined');
    }
    // 1) Getting token and check of it's there
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.cookies.jwt) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        token = req.cookies.jwt;
    }
    // if((req.cookies as { jwt: string }).jwt ){
    //   token = (req.cookies as { jwt: string }).jwt
    // }
    if (!token) {
        return next(new AppError_1.AppError('You are not logged in pls login again', 401));
    }
    // 2) Verification token
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const currentUser = await usersModel_1.default.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError_1.AppError('The user belonging to this token does no longer exist.', 401));
    }
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError_1.AppError('User recently changed password! Please log in again.', 401));
    }
    const authenticatedUser = {
        id: currentUser._id,
        email: currentUser.email,
        name: currentUser.name,
        role: currentUser.role,
    };
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = authenticatedUser;
    next();
});
//--------------------------------------------//
//---------------RBAC------------------------//
//-------------------------------------------//
const restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!req.user) {
            throw new Error('User role not defined');
        }
        if (!roles.includes(req.user.role)) {
            return next(new AppError_1.AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
//--------------------------------------------//
//---------------FORGOT PASSWORD--------------//
//-------------------------------------------//
exports.forgotPassword = catchAsync_1.catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const user = await usersModel_1.default.findOne({ email });
    if (!user) {
        return next(new AppError_1.AppError('There is no user with email address.', 404));
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    // console.log(req.hostname);
    // console.log(req.get('host'));
    const resetURL = `${req.protocol}://localhost:3000/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
    const subject = 'Reset Password Tours App admin';
    try {
        await email_1.sendEmail({ email, subject, message });
        res.status(200).json({
            status: 'success',
            message: 'Reset Password Token sent to email!',
        });
    }
    catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError_1.AppError('Failed to send email', 500));
    }
});
//--------------------------------------------//
//---------------RESET PASSWORD--------------//
//-------------------------------------------//
exports.resetPassword = catchAsync_1.catchAsync(async (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { resetToken } = req.params;
    const { password, passwordConfirm } = req.body;
    const hashedToken = crypto_1.default
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    const user = await usersModel_1.default.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: new Date(Date.now()) },
    });
    if (!user) {
        return next(new AppError_1.AppError('Token is invalid or expired', 400));
    }
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    createAndSendJWTToken(user, 200, res);
});
//--------------------------------------------//
//----------UPDATE CURRENT PASSWORD-----------//
//-------------------------------------------//
exports.updatePassword = catchAsync_1.catchAsync(async (req, res, next) => {
    var _a;
    const { password, passwordConfirm, passwordCurrent } = req.body;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const user = await usersModel_1.default.findById(id).select('+password');
    if (!user) {
        return next(new AppError_1.AppError('User not found', 400));
    }
    if (!(await user.correctPassword(passwordCurrent, user.password))) {
        return next(new AppError_1.AppError('Your current password is wrong.', 401));
    }
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    await user.save();
    createAndSendJWTToken(user, 200, res);
});
//--------------------------------------//
//---- HELPER FUNCTIONS---------------------//
//-------------------------------------//
const createAndSendJWTToken = (user, statusCode, res) => {
    if (!process.env.JWT_COOKIE_EXPIRES_IN) {
        throw new Error('JWT COOKIE EXPIRES IN not defined');
    }
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() +
            parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }
    res.cookie('jwt', token, cookieOptions);
    user.passwordConfirm = undefined;
    // user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};
const signToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT SECRET is not defined');
    }
    if (!process.env.JWT_EXPIRES_IN) {
        throw new Error('JWT EXPIRES IN is not defined');
    }
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
