import { Discussion } from "../models/discussion.model";
import { Message, MessageDetails, MessageText } from "../models/message.model";
import * as discussionBl from './discussion.bl';
import * as discussionService from '../services/discussion.service'
import log4js from 'log4js';

const logger = log4js.getLogger();


const addMessage = async (discussionId: string, userId: string, message: MessageText): Promise<Discussion> => {
    try{
        const discussion: Discussion = await discussionBl.getDiscussionsById(discussionId);
        if(!discussion){
            throw new Error(`Discussio ${discussionId} not found`); 
        }
        const messageDetails: MessageDetails = {
            ...message, 
            userId,
            readBy: [userId],
        }
        const updateDiscussion: Discussion | null = await discussionService.pushMessageToDiscussion(discussionId, messageDetails);
        if(!updateDiscussion){
            throw new Error(`Faild update discussion ${discussionId}`);
        }
        logger.info(`Message added to discussion ${discussionId} by user ${userId}`);
        return updateDiscussion;
    } catch (err) {
        logger.error('Faild add message ,' + err );
        throw new Error('Faild add message ,' + err );
    }
}

const markMessageAsRead = async (discussionId: string, messageId: string, userId: string) => {
    try {
        const discussion: Discussion = await discussionBl.getDiscussionsById(discussionId);
        const message: Message | undefined = discussion.messages.find(msg => msg._id === messageId);
        if (!message) {
            throw new Error(`Message with ID ${messageId} not found in discussion ${discussionId}`);
        }
        if (!message.readBy.includes(userId)) {
            message.readBy.push(userId); 
        }
        await discussionBl.updateDiscussion(discussionId, discussion);
        logger.info(`Message ${messageId} marked as read by user ${userId} in discussion ${discussionId}`);
    } catch (err) {
        logger.error('Failed to mark message as read: ' + err);
        throw new Error('Failed to mark message as read: ' + err);
    }
};


export {
    addMessage,
    markMessageAsRead,
}
