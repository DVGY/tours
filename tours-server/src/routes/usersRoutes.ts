import express from 'express';
// import {} from '../controllers/usersController'
import {
  protect,
  restrictTo,
  updatePassword,
  signup,
  login,
  forgotPassword,
  resetPassword,
} from '../controllers/authController';
import { UserRole } from '../models/usersModel';
import {
  getAllUsers,
  updateMe,
  deleteMe,
  deleteUser,
} from '../controllers/usersController';
const router = express.Router();

router.post('/signup', signup).post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:resetToken', resetPassword);
router.patch('/updatePassword', protect, updatePassword);

router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

router.route('/').get(getAllUsers);

router.route('/:id').get(protect, restrictTo(UserRole.ADMIN), deleteUser);

export = router;
