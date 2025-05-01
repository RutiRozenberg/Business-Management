import mongoose, { Schema, Model } from 'mongoose';
import { Message, MessageDetails, messageSchema } from './message.model';


interface DiscussionTitle {
    title: string;

}

interface DiscussionDetails extends DiscussionTitle{
    messages: MessageDetails[];
}

interface Discussion extends DiscussionTitle{
    _id: string;
    messages: Message[]
}

const discussionSchema: Schema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    messages: [messageSchema],
});

const DiscussionModel: Model<Discussion> = mongoose.model<Discussion>('Discussion', discussionSchema);

export {
    DiscussionModel,
    Discussion,
    DiscussionDetails,
}