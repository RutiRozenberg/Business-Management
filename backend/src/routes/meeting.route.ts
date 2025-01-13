import express from "express";
import * as meetingController from "../controllers/meeting.controller"
import { authorization } from "../middlewares/authorization.middleware";
import { currentUserAuthorization } from "../middlewares/user.authorization.middleware";
import { authentication } from "../middlewares/authentication.middleware";

const meetingRouter = express.Router();

meetingRouter.get('/meeting/:id', authentication , authorization, meetingController.getMeetingById );
meetingRouter.get('/meetings', authentication , authorization, meetingController.getAllMeetings );
meetingRouter.get('/meeting/user/:userId', authentication , currentUserAuthorization, meetingController.getMeetingsByUserId )
meetingRouter.post('/meeting' , authentication , currentUserAuthorization , meetingController.createMeeting);
meetingRouter.put('/meeting/:id', authentication , authorization,   meetingController.updateMeeting);
meetingRouter.delete('/meeting/:id',  authentication , authorization,  meetingController.deleteMeeting );

export default meetingRouter;
