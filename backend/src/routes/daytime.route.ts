import express from "express";
import { authentication } from "../middlewares/authentication.middleware";
import { authorization } from "../middlewares/authorization.middleware";
import * as daytimeController from "../controllers/dayTime.controller"



const dayTimeRouter = express.Router();

dayTimeRouter.get('/daytime/:id', authentication, daytimeController.getDayTimesById );
dayTimeRouter.get('/daytimes', authentication, daytimeController.getAllDayTimes );
dayTimeRouter.post('/daytime' , authentication , authorization , daytimeController.createDayTimes);
dayTimeRouter.put('/daytime/:id', authentication , authorization,  daytimeController.updateDayTimes);
dayTimeRouter.delete('/daytime/:id',  authentication , authorization, daytimeController.deleteDayTimes);

export default dayTimeRouter;