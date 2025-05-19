
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, AuthSocket } from '../models/auth.user.model';
import { SocketNextFunction } from '../models/next.function.socket.model';


const verifyToken = (token: string | undefined) => {
    if (!token) {
        throw new Error("Token not provided");
    }
    const decoded = jwt.verify(token, process.env.SECRET || '');
    return typeof decoded === 'string' ? JSON.parse(decoded) : decoded;
};


const authentication = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error("Missing or invalid authorization header");
        }

        const token = authHeader.split(' ')[1];
        req.user = verifyToken(token);

        next();
    } catch (err) {
        res.status(401).send("Unauthorized: Invalid Token");
        return;
    }
};


const socketAuthentication = (socket: AuthSocket, next: SocketNextFunction) => {
    const token = socket.handshake.auth.token;
    try {
        socket.user = verifyToken(token);
        next();
    } catch (err) {
        next(new Error("Unauthorized: Invalid Token"));
    }
};

export { authentication, socketAuthentication };