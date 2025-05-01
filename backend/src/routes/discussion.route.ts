import express from "express";
import * as discussionController from "../controllers/discussion.controller";
import { authorization } from "../middlewares/authorization.middleware";
import { currentUserAuthorization } from "../middlewares/user.authorization.middleware";
import { authentication } from "../middlewares/authentication.middleware";

const discussionRouter = express.Router();

discussionRouter.get('/discussions', authentication, authorization, discussionController.getAllDiscussions);
discussionRouter.get('/discussion/user/:userId', authentication, currentUserAuthorization, discussionController.getDiscussionsByUserId);
discussionRouter.put('/discussion/:discussionId/message/:messageId/read', authentication, currentUserAuthorization, discussionController.markMessageAsRead);

export default discussionRouter;
