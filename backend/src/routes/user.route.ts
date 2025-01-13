import express from "express";
import * as userController from "../controllers/user.controller";
import { authorization } from "../middlewares/authorization.middleware";
import { currentUserAuthorization } from "../middlewares/user.authorization.middleware";
import { authentication } from "../middlewares/authentication.middleware";


const userRouter = express.Router();

userRouter.get('/user/:id', authentication, currentUserAuthorization,  userController.getUserById);
userRouter.get('/users' , authentication , authorization , userController.getAllUsers);
userRouter.put('/user/:id' ,authentication , currentUserAuthorization,  userController.updateUser);

export default userRouter ;
