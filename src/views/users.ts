import express from 'express'
import UserController from '../controllers/users';


const userRouter = express.Router();

userRouter.post('/sign-up', UserController.signUp);

export default userRouter;
