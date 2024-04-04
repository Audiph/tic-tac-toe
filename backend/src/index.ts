// Required environmental variables and configuration
require('dotenv').config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import Helmet from 'helmet';
import * as logger from 'morgan';
import * as path from 'path';
import { globFiles } from './helpers';
import connect from './database';
import { DATABASE_URL, MODELS_DIR, ROUTES_DIR } from './var/config';

const app: express.Express = express();

// Database Connection
if (DATABASE_URL) {
  connect(DATABASE_URL);
}

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(Helmet());
app.use(Helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors());

// Models & Routes
globFiles(MODELS_DIR).forEach((model) => require(path.resolve(model)));
globFiles(ROUTES_DIR).forEach((route) => {
  const { default: Route } = require(path.resolve(route));
  new Route(app);
});

// Vercel compatible serverless function export
export default (req: express.Request, res: express.Response) => {
  app(req, res);
};
