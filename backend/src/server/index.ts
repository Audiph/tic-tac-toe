import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as cors from 'cors';
import Helmet from 'helmet';
import * as serverless from 'serverless-http';

import { DATABASE_URL, MODELS_DIR, ROUTES_DIR } from '../var/config';
import { globFiles } from '../helpers';
import connect from '../database';

const app: express.Express = express();

for (const model of globFiles(MODELS_DIR)) {
  require(path.resolve(model));
}

if (DATABASE_URL) {
  connect(DATABASE_URL);
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(Helmet());
app.use(Helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors());

const routes = globFiles(ROUTES_DIR);

for (const route of routes) {
  const { default: Route } = require(path.resolve(route));
  const _ = new Route(app);
}

export const handler = serverless(app);

export default app;
