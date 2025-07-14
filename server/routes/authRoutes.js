import express from 'express'
import { registered } from '../controllers/authcontroller.js'
import { login } from '../controllers/authcontroller.js'
import { logout } from '../controllers/authcontroller.js'

const authRouter = express.Router();
authRouter.post('/registered',registered);
authRouter.post('/login',login);
authRouter.post('/logout',logout);

export default authRouter;
    