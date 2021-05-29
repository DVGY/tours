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
  getUser,
  getMe,
} from '../controllers/usersController';
const router = express.Router();

router.post('/signup', signup).post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:resetToken', resetPassword);

router.use(protect);

// protect
router.get('/me', getMe, getUser);
router.patch('/updatePassword', updatePassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo(UserRole.ADMIN));

// protect + restrict
router.route('/').get(getAllUsers);
router.route('/:id').get(deleteUser);

export = router;
