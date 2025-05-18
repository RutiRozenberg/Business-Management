
import { Request } from 'express';
import { Socket } from 'socket.io';

interface AuthUser {
    _id: string;
    name: string;
    isAdmin?: boolean;
    email: string;
}


interface AuthRequest extends Request {
    user?: AuthUser
}

interface AuthSocket extends Socket {
    user?: AuthUser
}


export {
    AuthRequest, 
    AuthSocket, 
    AuthUser
}