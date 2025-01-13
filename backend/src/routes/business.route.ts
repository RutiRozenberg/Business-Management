import express from "express";
import * as businessController from "../controllers/business.controller"
import { authorization } from "../middlewares/authorization.middleware";
import { authentication } from "../middlewares/authentication.middleware";


const businessRouter = express.Router();

businessRouter.post('/business',authentication , authorization ,  businessController.createBusiness);
businessRouter.get('/business', businessController.getBusiness );
businessRouter.put('/business/:id',authentication, authorization,  businessController.updateBusiness);
businessRouter.delete('/business/:id', authentication, authorization, businessController.deleteBusiness );


export default businessRouter;
