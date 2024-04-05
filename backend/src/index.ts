/* tslint:disable-next-line */
require('dotenv').config();
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import Helmet from 'helmet';
import { DATABASE_URL, PORT } from './var/config';
import dbConnect from './database';
import GameRoutes from './routes/games.server.route';

const app: Application = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(Helmet());
app.use(Helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(
  cors({
    origin: 'https://tic-tac-toe-client-rose.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.use('/api/v1', GameRoutes);

app.listen(PORT || 5000, (): void => {
  if (DATABASE_URL) {
    dbConnect();
    console.log(
      `Server started on port ${PORT} on env ${process.env.NODE_ENV || 'dev'}`
    );
  } else {
    console.log(
      `Server started on port ${PORT} on env ${process.env.NODE_ENV || 'dev'}`
    );
  }
});
