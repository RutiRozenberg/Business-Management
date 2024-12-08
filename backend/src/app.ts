
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
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

const app: Express = express();

logConfig();

const envPath = path.join(__dirname, '../config', '.env');
dotenv.config({ path: envPath });

const port = process.env.PORT;
const client = process.env.CLIENT
const allowedOrigins = [
    client,
];
const corsOptions = {
    origin: (origin: string | undefined, callback: (arg0: Error | null, arg1?: boolean | undefined) => void) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};



swaggerSetup(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

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

app.use(urlnotFound);

app.listen(port, () => {
    console.log('Server is running on port ' + port); 
});
