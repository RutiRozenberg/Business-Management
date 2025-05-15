
import { Response, NextFunction } from 'express';
import { AuthRequest, AuthSocket, AuthUser } from '../models/authUser.model';
import * as userBl from '../bl/user.bl';
import { User } from '../models/user.model';
import { SocketNextFunction } from '../models/nextFunctionSocket.model';

const checkAuthorization = async (currentUserRole: AuthUser, id: string) => {
    try{
        const user: User = await userBl.getUserById(id);
        if (currentUserRole?._id.toString() !== user._id.toString()) {
            throw new Error("Forbidden: current User does not have the necessary role");
        }
    } catch (err){
        throw new Error("" + err);
    }
   
};

const currentUserAuthorization = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const currentUserRole: AuthUser  = req.user!;
        const idBody: string = req.body.userId;
        const idParams:string = req.params.userId;

        if(!idBody && !idParams){
            res.status(400).send('Invalid parameters');
            return;
        }

        let id = idParams;
        if(idBody){
            id = idBody;
        }

        try{
            await checkAuthorization(currentUserRole, id);
        } catch (err) {
            res.status(403).send(err);   
            return;         
        }

        next();
    }
    catch(err) {
        res.status(400).send(err);
        return;
    }
};

const socketCurrentUserAuthorization = async (socket: AuthSocket, next: SocketNextFunction) => {
    try {
        const currentUserRole = socket.handshake.auth.user;
        const idBody: string = socket.data.userId;

        if (!idBody) {
            next(new Error('Invalid parameters'));
            return;
        }

        await checkAuthorization(currentUserRole, idBody);
        next();

    } catch (error) {
        next(new Error(typeof error === 'string'? error : 'Forbidden'));
    }
};

export { currentUserAuthorization , socketCurrentUserAuthorization };

