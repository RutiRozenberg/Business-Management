
import { Request } from 'express';


interface AuthRequest extends Request {
    user?: {
        _id: string;
        name: string;
        isAdmin?: boolean;
        email: string; 
    };
}


export {AuthRequest}