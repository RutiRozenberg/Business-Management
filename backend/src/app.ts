
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import './config/db.config';
import { swaggerSetup } from './swagger';
import authUserRouter from './routes/auth.user.route';
import { CheckBody } from './middlewares/existBody.middleware'
import authAdminRouter from './routes/auth.admin.route';
import businessRouter from './routes/business.route'
import serviceRouter from './routes/service.route'
import timeRouter from './routes/time.route';
import meetingRouter from './routes/meeting.route';
import urlnotFound from './middlewares/url.not.found.middleware';
import userRouter from './routes/user.route';
import dayTimeRouter from './routes/daytime.route';
import logConfig from './config/log.config'
import homePageRouter from './routes/homePage.route';
import { corsMiddleware } from './middlewares/cors.middleware';
import { jsonErrorMiddleware } from './middlewares/json.error.middleware';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import discussionRouter from './routes/discussion.route';
import { setupSocketServer } from './socketServer';


const app: Express = express();

logConfig();

const envPath = path.join(__dirname, '../config', '.env');
dotenv.config({ path: envPath });

const port = process.env.PORT;
const server = http.createServer(app);

app.use(corsMiddleware);

swaggerSetup(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(jsonErrorMiddleware);
app.use(CheckBody);
app.use(authAdminRouter);
app.use(authUserRouter);
app.use(businessRouter);
app.use(serviceRouter);
app.use(timeRouter);
app.use(meetingRouter);
app.use(dayTimeRouter);
app.use(homePageRouter);
app.use(userRouter);
app.use(discussionRouter);
app.use(urlnotFound);

export const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST", "PUT"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});
setupSocketServer(io);


server.listen(port, () => {
    console.log('Server listening on port 3000');
});
