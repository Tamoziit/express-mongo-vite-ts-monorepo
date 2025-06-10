import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import connecToMongoDB from './db/connectToMongoDB';
import client from './redis/client';
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';

const PORT = process.env.PORT || 3000;

const app = express();
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'PATCH',
        'OPTIONS'
    ],
    allowHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'X-CSRF-Token',
        'X-HTTP-Method-Override'
    ],
    credentials: true
};

app.use(cors(corsOpts));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/v1', (req: Request, res: Response) => {
    res.send('Server Up & Running!');
});

app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on PORT: ${PORT}`);
    connecToMongoDB();

    if(client) {
        console.log("📦 Connected to Redis");
    } else {
        console.log("❌ Error in connecting to Redis");
    }
});