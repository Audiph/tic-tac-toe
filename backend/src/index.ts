/* tslint:disable-next-line */
require('dotenv').config();
import * as http from 'http';
import { DATABASE_URL, PORT } from './var/config';
import app from './server';
import * as awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

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

export default serverless;
