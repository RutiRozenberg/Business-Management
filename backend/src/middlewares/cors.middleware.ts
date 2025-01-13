import cors from 'cors';

const allowedOrigins = [process.env.CLIENT || '', process.env.SWAGGER || ''];

const corsOptions = {
    origin: allowedOrigins
};

export const corsMiddleware = cors(corsOptions);