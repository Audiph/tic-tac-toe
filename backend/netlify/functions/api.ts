import express, { Application } from 'express';
import serverless from 'serverless-http';
import GameRoutes from '../../src/routes/games.server.route';
import bodyParser from 'body-parser';
require('dotenv').config();
import logger from 'morgan';
import cors from 'cors';
import Helmet from 'helmet';
import dbConnect from '../../src/database';

const api: Application = express();

api.use(logger('dev'));
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

api.use(Helmet());
api.use(Helmet.crossOriginResourcePolicy({ policy: 'same-site' }));
api.use(
  cors({
    origin: 'https://tic-tac-toe-client-rose.vercel.app', // Adjust the origin according to your client app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

api.use('/api/v1', GameRoutes);

const handler = serverless(api);

module.exports.handler = async (event: Object, context: Object) => {
  await dbConnect();
  const result = await handler(event, context);
  return result;
};
