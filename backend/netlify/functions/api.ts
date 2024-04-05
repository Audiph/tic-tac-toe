require('dotenv').config();
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import Helmet from 'helmet';
import dbConnect from '../../src/database';
import GameRoutes from '../../src/routes/games.server.route';
import serverless from 'serverless-http';

const api: Application = express();

dbConnect();

api.use(logger('dev'));
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(express.json());
api.use(Helmet());
api.use(Helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
api.use(cors());

api.use('/api/v1', GameRoutes);

export const handler = serverless(api);
