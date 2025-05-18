import express from 'express'
import * as homePageController from '../controllers/homepage.controller'
import { authorization } from '../middlewares/authorization.middleware';
import { authentication } from '../middlewares/authentication.middleware';

const homePageRouter = express.Router();

homePageRouter.get('/homepage', homePageController.getHomePage);
homePageRouter.post('/homepage' , authentication , authorization  , homePageController.createHomePage);
homePageRouter.put('/homepage/:id', authentication , authorization , homePageController.updateHomePage);

export default homePageRouter;
