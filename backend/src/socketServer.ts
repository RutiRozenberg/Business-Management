import { Server } from 'socket.io';
import { AuthSocket } from './models/authUser.model'; 
import * as discussionController from './controllers/discussion.controller'; 
import { socketAuthentication } from './middlewares/authentication.middleware';
import { DiscussionDetails } from './models/discussion.model';
import { MessageText } from './models/message.model';

export const setupSocketServer = (io: Server) => {    
    io.use(socketAuthentication);

    io.on('connection', (socket: AuthSocket) => {    
        console.log('User connected: ', socket.user!._id);
        
        if(socket.user?.isAdmin){
            socket.join('admin');
        } else {
            socket.join(socket.user!._id);          
        }
        
        socket.on('createDiscussion', async (discussion: DiscussionDetails) => {
            await discussionController.createDiscussion(socket, discussion);
        });
        
        socket.on('addMessage', async (discussionId: string, newMessage: MessageText) => {
            await discussionController.addMessage(socket, discussionId, newMessage);
        });
        
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.user!._id);
        });
    });
};
