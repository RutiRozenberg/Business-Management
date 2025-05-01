
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../models/authUser.model';


const authorization = (req: AuthRequest, res: Response, next: NextFunction) => {
    const adminRole = req.user ; 

    if (adminRole && adminRole.isAdmin === false) {
        res.status(403).send("Forbidden: User does not have the necessary role");
        return;
    }

    next();
};

export { authorization };