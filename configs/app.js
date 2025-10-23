'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import 'dotenv/config';
import User from "../src/users/user.model.js";
import { dbConnection } from './db.js';
import userModel  from '../src/users/user.model.js';
import authRoutes from '../src/auth/auth.routes.js'
import postRoutes from '../src/posts/post.routes.js'
import requestLimit from '../middlewares/request-limit.js';
import commentsRoutes from '../src/comments/comment.routes.js'

const middlewares = (app) =>{
    app.use(express.json());
    app.use(express.urlencoded({extended: false}))
    app.use(cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders:['Content-Type', 'Authorization']
    }));
    app.use(helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
        crossOriginEmbedderPolicy: false
    }));
    app.use(morgan('dev'));
    app.use (requestLimit)
}

const routes = (app) =>  {
    app.use('/api/auth', authRoutes);
    app.use('/api/posts', postRoutes);
    app.use('/api/comments', commentsRoutes);
}

const conectarDB = async () => {
    try{
        await dbConnection();
    }catch(error){
        console.log(`Error al conectar la db: ${error.message}`)
    }
}
export const initServer = async () => {
    const app = express();

    try{
        middlewares(app)
        routes(app)
        await conectarDB()
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port: ${process.env.PORT}`)
        })
    }catch(error){
    console.log(`Error al inciar el servidor: ${error}`);
    }
}