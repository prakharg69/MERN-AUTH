import express from 'express'
import { registered, sendVerifyOtp, verifyEmail } from '../controllers/authcontroller.js'
import { login } from '../controllers/authcontroller.js'
import { logout } from '../controllers/authcontroller.js'
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();
authRouter.post('/registered',registered);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
authRouter.post('/verify-account',userAuth,verifyEmail);

export default authRouter;
    