import * as discussionBl from '../bl/discussion.bl'
import { Request, Response } from 'express';
import { Discussion, DiscussionDetails } from "../models/discussion.model";
import * as messageBl from '../bl/message.bl';
import { Message, MessageText } from '../models/message.model';
import { AuthRequest, AuthSocket } from '../models/auth.user.model';
import {io} from '../app'

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
 *     Message:
 *       type: object
 *       required:
 *         - _id
 *         - message
 *         - userId
 *         - readBy
 *       properties:
 *         _id:
 *          type: string
 *          description: The unique identifier for the Message
 *         message:
 *          type: string
 *          description: The text of message
 *         userId:
 *          type: string
 *          description: The unique identifier of user
 *         readBy:
 *          type: array
 *          items: string
 *          description: The user that read the message
 *       example:
 *         _id: '1'
 *         message: 'ABC'
 *         userId: '1'
 *         readBy: []
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
 * /discussion/user/{userId}:
 *   get:
 *     summary: Get discussions by user ID
 *     tags: [Discussion]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user 
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
        io.to('admin').emit("discussionCreated", newDiscussion);
        io.to(socket.user!._id).emit("discussionCreated", newDiscussion);
    } catch (err) {        
        io.emit("error", "Invalid discussion details");
    }
}


const addMessage = async (socket: AuthSocket, discussionId:string, newMessage: MessageText): Promise<void> => {
    try {
        const userId: string =socket.user!._id;
        const discussion: Discussion = await messageBl.addMessage(discussionId, userId, newMessage);
        const rooms: string[] = [discussion.messages[0].userId, 'admin']; 
        const lastMessage: Message = discussion.messages[discussion.messages.length - 1];
        rooms.forEach( room => {
            io.to(room).emit("messageAdded", discussionId, lastMessage);
        })
    } catch (err){        
        io.emit("error", "Discussion update failed");
    }
}


export { 
    getAllDiscussions,
    getDiscussionsByUserId,
    createDiscussion,
    addMessage,
    markMessageAsRead,
}
