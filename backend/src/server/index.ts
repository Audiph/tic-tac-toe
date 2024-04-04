import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';

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

const routes = globFiles(ROUTES_DIR);

for (const route of routes) {
  const { default: Route } = require(path.resolve(route));
  const _ = new Route(app);
}

export default app;
