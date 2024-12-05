
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../models/authRequest.model';
import * as userBl from '../bl/user.bl';
import { User } from '../models/user.model';


const currentUserAuthorization = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const currentUserRole = req.user;
        let id: string = '';
        if (req.body.userId) {
            id = req.body.userId;
        }
        if(req.params.id)
        {
            id = req.params.id;
        }
        if(req.body.id) {
           id = req.body.id;
        }
        const user: User = await userBl.getUserById(id);
        if (currentUserRole?._id.toString() !== user.email) {
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

