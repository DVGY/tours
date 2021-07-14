"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
// import {} from '../controllers/usersController'
const authController_1 = require("../controllers/authController");
const usersModel_1 = require("../models/usersModel");
const usersController_1 = require("../controllers/usersController");
const router = express_1.default.Router();
router.get('/logout', authController_1.logout).post('/signup', authController_1.signup).post('/login', authController_1.login);
router.post('/forgotPassword', authController_1.forgotPassword);
router.patch('/resetPassword/:resetToken', authController_1.resetPassword);
router.use(authController_1.protect);
// protect
router.get('/me', usersController_1.getMe, usersController_1.getUser);
router.patch('/updatePassword', authController_1.updatePassword);
router.patch('/updateMe', usersController_1.updateMe);
router.delete('/deleteMe', usersController_1.deleteMe);
router.use(authController_1.restrictTo(usersModel_1.UserRole.ADMIN));
// protect + restrict
router.route('/').get(usersController_1.getAllUsers);
router.route('/:id').get(usersController_1.deleteUser);
module.exports = router;
