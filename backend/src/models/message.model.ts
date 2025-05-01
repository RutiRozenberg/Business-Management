import { Schema } from "mongoose";

interface MessageText {
    message: string;
}

interface MessageDetails extends MessageText{
    userId: string;
    readBy: string[];
}

interface Message extends MessageDetails {
    _id: string;
}

const messageSchema: Schema = new Schema({
    userId: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true
    },
    readBy: [String],
},{ timestamps: true });


export {
    Message,
    MessageDetails,
    messageSchema,
    MessageText,
}