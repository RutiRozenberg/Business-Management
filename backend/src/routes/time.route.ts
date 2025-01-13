import express from "express";
import * as timeController from "../controllers/time.controller";
import { authorization } from "../middlewares/authorization.middleware";
import { authentication } from "../middlewares/authentication.middleware";


const timeRouter = express.Router();

timeRouter.get('/timerange/:daytimeId/:timerangeId', authentication , timeController.getTimeById);
timeRouter.post('/timerange/:daytimeId' , authentication , authorization , timeController.createTime);
timeRouter.put('/timerange/:daytimeId' , authentication, authorization , timeController.updateTime);
timeRouter.delete('/timerange/:daytimeId/:timerangeId' , authentication , authorization , timeController.deleteTime);

export default timeRouter ;
