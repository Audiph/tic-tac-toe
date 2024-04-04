/* tslint:disable-next-line */
require('dotenv').config();
import * as http from 'http';
import * as awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as cors from 'cors';
import Helmet from 'helmet';
import { DATABASE_URL, PORT, MODELS_DIR, ROUTES_DIR } from './var/config';
import { globFiles } from './helpers';
import connect from './database';

const app: express.Express = express();

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

for (const model of globFiles(MODELS_DIR)) {
  require(path.resolve(model));
}

for (const route of routes) {
  const { default: Route } = require(path.resolve(route));
  const _ = new Route(app);
}

const server: http.Server = http.createServer(app);

const serverless = awsServerlessExpress.createServer(app);

server.listen(PORT);

server.on('error', (e: Error) => {
  console.log('Error starting server' + e);
});

server.on('listening', () => {
  if (DATABASE_URL) {
    console.log(
      `Server started on port ${PORT} on env ${
        process.env.NODE_ENV || 'dev'
      } dbcon ${DATABASE_URL}`
    );
  } else {
    console.log(
      `Server started on port ${PORT} on env ${process.env.NODE_ENV || 'dev'}`
    );
  }
});

exports.handler = (event: APIGatewayProxyEvent, context: Context) => {
  awsServerlessExpress.proxy(serverless, event, context);
};

export default server;
