import { Discussion, DiscussionDetails, DiscussionModel } from "../models/discussion.model"
import { MessageDetails } from "../models/message.model";

const getAllDiscussions = async (): Promise<Discussion[]> => {
    try{
        const allDiscussion: Discussion[] = await DiscussionModel.find();
        return allDiscussion
    } catch {
        throw new Error("Failed to load discussions from the database");
    }
}


const getDiscussionById = async (id: string): Promise<Discussion | null> => {
    try{
        const discussion: Discussion | null = await DiscussionModel.findById(id);
        return discussion;
    } catch {
        throw new Error("Failed to load discussion from the database");
    }
}

const createDiscussion = async (discussion: DiscussionDetails): Promise<Discussion> => {
    try{
        const newDiscussion = new DiscussionModel(discussion);
        const savedDiscusiion = await newDiscussion.save();                
        return savedDiscusiion;
    } catch {
        throw new Error("Failed to save discussion to the database"); 
    }
}

const updateDiscussion = async (id: string, discussion:Discussion) => {
    try {
        const discussionupdated: Discussion | null  = await DiscussionModel.findByIdAndUpdate(
            { _id: id }, 
            { $set: { field: discussion } }, 
            { new: true }
        );
        return discussionupdated;
    } catch {
        throw new Error('Failed to update discussion in the database');
    }
}

const pushMessageToDiscussion = async (id: string, message:MessageDetails) => {
    try {
        const discussionupdated: Discussion | null  = await DiscussionModel.findByIdAndUpdate(
            { _id: id }, 
            { $push: { messages: message } }, 
            { new: true }
        );
        return discussionupdated;
    } catch {
        throw new Error('Failed to update discussion in the database');
    }
}


export {
    getAllDiscussions,
    getDiscussionById,
    createDiscussion,
    updateDiscussion,
    pushMessageToDiscussion,
}