import express from 'express';
// import {} from '../controllers/usersController'
import { signup, login } from '../controllers/authController';
const router = express.Router();

router.post('/signup', signup).post('/login', login);

export = router;
