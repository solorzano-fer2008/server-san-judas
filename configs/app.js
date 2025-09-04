'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import 'dotenv/config';

const middlewares = (app) =>{
    app.use(express.json());
    app.use(express.urlencoded({extended: false}))
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
}

export const initServer = () => {
    const app = express();

    try{
        app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
        })
    }catch(error){
    console.log(`Error al inciar el servidor: ${error}`);
    }
}