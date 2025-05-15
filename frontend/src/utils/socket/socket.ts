import { io, Socket } from "socket.io-client";
import { DiscussionDetails } from "../../models/discussion.models/discussion.details.model";
import { MessageText } from "../../models/discussion.models/message.models/message.text.model";
import { Message } from "../../models/discussion.models/message.models/message.model";
import { Discussion } from "../../models/discussion.models/discussion.model";

const API_URL: string = import.meta.env.VITE_BASE_URL_SERVER ?? '';
let socket: Socket | null = null;

const openSocket = (token: string, callbackDiscussionCreated: (discussion: Discussion) => void , callbackMessageAdded: (id:string, message: Message) => void ) => {
    
    if(!socket || socket.connected === false){
        
        socket = io(API_URL, { auth: { token } });
        
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('discussionCreated', (discussion: Discussion) => {
            callbackDiscussionCreated(discussion);
        });


        socket.on('messageAdded', (discussionId: string, newMessage: Message) => {
            callbackMessageAdded(discussionId, newMessage);
        })
        
        socket.on('connect_error', (err) => {
            console.error('Connection Error:', err);
        });
        
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }
    
}


const createDiscussion = (discussionDetails: DiscussionDetails) => {
    try {
        socket?.emit("createDiscussion", discussionDetails);
    } catch (error) {
        console.error("Error creating discussion:", error);
    }
};

const addMessage = (discussionId:string, newMessage: MessageText) => {
    try{
        socket?.emit("addMessage", discussionId, newMessage);
    } catch (error) {
        console.error(error); 
    }
}


const messageAdded = (callback: (id:string, message: Message) => void) => {
    socket?.on('messageAdded', (discussionId: string, newMessage: Message) => {
        callback(discussionId, newMessage);
    })
}


const closeSocket = () => {
    socket?.disconnect();
}


export {
    openSocket, 
    closeSocket, 
    addMessage, 
    createDiscussion, 
    messageAdded,
}