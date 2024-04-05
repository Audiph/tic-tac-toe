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
api.use(cors());

api.use('/api/v1', GameRoutes);

const handler = serverless(api);

api.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

exports.handler = async (event: Object, context: Object) => {
  try {
    await dbConnect().catch((err) =>
      console.error('Failed to connect to DB', err)
    );
    const result = await handler(event, context);
    return result;
  } catch (error) {
    console.error('Database connection failed', error);
    return { statusCode: 500, body: 'Database connection failed' };
  }
};
