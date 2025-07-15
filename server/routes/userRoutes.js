import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserdata } from '../controllers/usercontroller.js';

const userRouter = express.Router();

userRouter.get('/data',userAuth,getUserdata)
export default userRouter;