import { Discussion, DiscussionDetails } from '../models/discussion.model';
import { MessageDetails } from '../models/message.model';
import * as discussionService from '../services/discussion.service';
import log4js from 'log4js';

const logger = log4js.getLogger();

const getAllDiscussions = async (): Promise<Discussion[]> => {
    try{
        const discussion: Discussion[] | null = await discussionService.getAllDiscussions();
        if(discussion.length <= 0) {
            throw new Error("Discussions not found");  
        }
        return discussion;
    } catch{
        throw new Error("Faild");     
    }
}


const getDiscussionsById = async (id: string): Promise<Discussion> => {
    try{
        const discussion: Discussion | null = await discussionService.getDiscussionById(id);
        if(!discussion) {
            throw new Error("Discussion not found");
        }
        return discussion;
    } catch{
        throw new Error("Faild");     
    }
}


const getDiscussionsByUserId = async (userId: string) => {
    try {
        const discussions: Discussion[] = await getAllDiscussions();
        const discussionsByUser: Discussion[] = discussions.filter(dis => dis.messages[0].userId === userId);
        
        if (discussionsByUser && discussionsByUser.length <= 0) {
            const errorMessage = "Discussion not found for user ID: " + userId;
            logger.error(errorMessage);
            throw new Error(errorMessage);
        } else {
            return discussionsByUser;
        }
    } catch (err) {
        let errorMessage: string;

        if (err instanceof Error) {
            errorMessage = "Failed to retrieve discussions for user ID: " + userId + ", Error: " + err.message;
        } else {
            errorMessage = "Failed to retrieve discussions for user ID: " + userId + ", Unknown error occurred.";
        }

        logger.error(errorMessage);
        throw new Error(errorMessage);
    }
}

const createDiscussion = async (newDiscussion: DiscussionDetails, userId: string): Promise<Discussion> => {
    try{        
        if(!(newDiscussion.title) || (newDiscussion.messages.length) !== 1) {            
            throw new Error("Invalid discussion details");       
        }
        const {message} = newDiscussion.messages[0];
        const  newMessage: MessageDetails = {
            userId,
            message,
            readBy: [userId]
        }
        newDiscussion.messages = [newMessage];
        const discussion: Discussion = await discussionService.createDiscussion(newDiscussion);        
        return discussion
    } catch {
        throw new Error("Discussion creation failed");
    }
}

const updateDiscussion = async (id: string, discussion: Discussion): Promise<Discussion> => {    
    if (id != discussion._id || 
        !discussion.title || 
        discussion.messages.length <= 0 
    ) {
        throw new Error("Invalid parameters");
    }
    try {
        const discussionToUpdate: Discussion | null = (await discussionService.getDiscussionById(id));
        if (!discussionToUpdate) {
            throw new Error("Discussion not found");
        }
        const discussionUpdated = await discussionService.updateDiscussion(id, discussion);
        if(!discussionUpdated){
            throw new Error("The update failed");
        }
        return discussionUpdated;
    }
    catch {
        throw new Error("The update failed");
    }
}


export {
    getAllDiscussions,
    getDiscussionsById,
    getDiscussionsByUserId,
    createDiscussion,
    updateDiscussion,
}