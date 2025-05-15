import cors from 'cors';

const allowedOrigins = [process.env.CLIENT || '', process.env.SWAGGER || ''];

export const corsOptions = {
    origin: allowedOrigins
};

export const corsMiddleware = cors(corsOptions);