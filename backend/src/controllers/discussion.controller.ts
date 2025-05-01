import * as discussionBl from '../bl/discussion.bl'
import { Request, Response } from 'express';
import { Discussion, DiscussionDetails } from "../models/discussion.model";
import * as messageBl from '../bl/message.bl';
import { MessageText } from '../models/message.model';
import { AuthRequest, AuthSocket } from '../models/authUser.model';


/**
 * @swagger
 * tags:
 *   name: Discussion
 *   description: APIs for managing discussions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Discussion:
 *       type: object
 *       required:
 *         - _id
 *         - title
 *         - messages
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the discussion
 *         title:
 *           type: string
 *           description: The title of the discussion
 *         messages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Message'  # Assuming Message schema is defined elsewhere
 *       example:
 *         _id: '1'
 *         title: 'Discussion about Software Development'
 *         messages: []
 */



/**
 * @swagger
 * /discussions:
 *   get:
 *     summary: Get all discussions
 *     tags: [Discussion]
 *     responses:
 *       200:
 *         description: List of all discussions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discussion'
 */
const getAllDiscussions = async(req: Request, res: Response): Promise<void> => {
    try{
        const allDiscussions: Discussion[] = await discussionBl.getAllDiscussions();
        res.status(200).send(allDiscussions);
    }
    catch{
        res.status(404).send("Discussions not found");
    }
}


/**
 * @swagger
 * /discussion/user:
 *   get:
 *     summary: Get discussions by user ID
 *     tags: [Discussion]
 *     responses:
 *       200:
 *         description: List of discussions for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discussion'
 */
const getDiscussionsByUserId = async (req:Request, res:Response): Promise<void> => {
    try {
        const userId: string = req.params.userId;
        const discussionsByUserId: Discussion[] = await discussionBl.getDiscussionsByUserId(userId);
        res.status(200).send(discussionsByUserId);
    } catch (error) {
        res.status(404).send("Not found");
    }
}



/**
 * @swagger
 * /discussion/{discussionId}/message/{messageId}/read:
 *   put:
 *     summary: Mark a message as read
 *     tags: [Discussion]
 *     parameters:
 *       - in: path
 *         name: discussionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the discussion
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the message to mark as read
 *     responses:
 *       200:
 *         description: Message marked as read successfully
 *       400:
 *         description: Failed to mark message as read
 */
const markMessageAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const discussionId = req.params.discussionId;
        const messageId = req.params.messageId;
        const userId = req.user!._id;
        await messageBl.markMessageAsRead(discussionId, messageId ,userId);
        res.status(200).send("The update was successful");
    } catch (err) {
        res.status(400).send("Discussion update failed");
    }
}


const createDiscussion = async (socket: AuthSocket, discussion: DiscussionDetails): Promise<void> => {
    try {
        const newDiscussion: Discussion = await discussionBl.createDiscussion(discussion, socket.user!._id);
        socket.to('admin').emit("discussionCreated", newDiscussion);
    } catch (err) {        
        socket.emit("error", "Invalid discussion details");
    }
}


const addMessage = async (socket: AuthSocket, discussionId:string, newMessage: MessageText): Promise<void> => {
    try {
        const userId: string =socket.user!._id;
        const discussion: Discussion = await messageBl.addMessage(discussionId, userId, newMessage);
        let room: string = discussion.messages[0].userId;
        if(!socket.user!.isAdmin){
            room = 'admin';
        }                         
        socket.to(room).emit("messageAdded", discussion._id, discussion.messages[discussion.messages.length - 1]);
    } catch (err){        
        socket.emit("error", "Discussion update failed");
    }
}


export { 
    getAllDiscussions,
    getDiscussionsByUserId,
    createDiscussion,
    addMessage,
    markMessageAsRead,
}
