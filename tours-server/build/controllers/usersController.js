"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.deleteMe = exports.updateMe = exports.getUser = exports.getMe = exports.getAllUsers = void 0;
const usersModel_1 = __importDefault(require("../models/usersModel"));
const AppError_1 = require("../utils/AppError");
const catchAsync_1 = require("../utils/catchAsync");
const handlerFactory_1 = require("./handlerFactory");
//--------------------------------------------//
//----------GET ALL USERS   -----------//
//-------------------------------------------//
exports.getAllUsers = catchAsync_1.catchAsync(async (req, res, next) => {
    const users = await usersModel_1.default.find();
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users,
        },
    });
});
//--------------------------------------------//
//----------GET CURRENT USER PROFILE ---------//
//-------------------------------------------//
const getMe = (req, res, next) => {
    var _a;
    req.params.id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    next();
};
exports.getMe = getMe;
//--------------------------------------------//
//----------GET USER PROFILE ---------//
//-------------------------------------------//
exports.getUser = handlerFactory_1.getOne(usersModel_1.default);
//--------------------------------------------//
//----------UPDATE USER PROFILE   -----------//
//-------------------------------------------//
const filterObj = (obj, allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    });
    return newObj;
};
exports.updateMe = catchAsync_1.catchAsync(async (req, res, next) => {
    var _a;
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError_1.AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
    }
    // Update only email or/and name
    const filteredBody = filterObj(req.body, ['name', 'email']);
    // const fieldsToUpdate = {
    //   name: req.body.name,
    //   email: req.body.email,
    // };
    // 3) Update user document
    const updatedUser = await usersModel_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, filteredBody, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
});
//--------------------------------------------//
//----DELETE USER PROFILE USER ACTION--------//
//-------------------------------------------//
exports.deleteMe = catchAsync_1.catchAsync(async (req, res, next) => {
    var _a;
    await usersModel_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, { active: false });
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
//--------------------------------------------//
//----DELETE USER PROFILE ADMIN ACTION--------//
//-------------------------------------------//
exports.deleteUser = handlerFactory_1.deleteOne(usersModel_1.default);
//--------------------------------------------//
//----------INTERFACE   -----------//
//-------------------------------------------//
//--------------------------------------------//
//----------HELPER FUNCTIONS  -----------//
//-------------------------------------------//
// const filterObj = (obj:, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach(el => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });
//   return newObj;
// };
