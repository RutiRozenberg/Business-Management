import express from "express";
import * as serviceController from "../controllers/service.controller"
import { authorization } from "../middlewares/authorization.middleware";
import { authentication } from "../middlewares/authentication.middleware";

const serviceRouter = express.Router();

serviceRouter.get('/service/:id', serviceController.getServiceById );
serviceRouter.get('/services', serviceController.getAllServices );
serviceRouter.post('/service' , authentication, authorization,  serviceController.createService);
serviceRouter.put('/service/:id',authentication, authorization,   serviceController.updateService);
serviceRouter.delete('/service/:id',  authentication , authorization,  serviceController.deleteService );

export default serviceRouter;
