
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../models/authRequest.model';
import * as userBl from '../bl/user.bl';
import { User } from '../models/user.model';


const currentUserAuthorization = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const currentUserRole = req.user;
        const id: string = req.body.userId;
        if(!id){
            return res.status(400).send('Invalid parameters');
        }
        const user: User = await userBl.getUserById(id);
        if (currentUserRole?._id.toString() !== user._id.toString()) {
            return res.status(403).send("Forbidden: current User does not have the necessary role");
        }
        else {            
            next();
        }
    }
    catch {
        return res.status(400).send("Faild");
    }
};

export { currentUserAuthorization };

