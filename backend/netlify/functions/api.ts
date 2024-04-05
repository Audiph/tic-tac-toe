import express, { Application } from 'express';
import serverless from 'serverless-http';
import GameRoutes from '../../src/routes/games.server.route';

const api: Application = express();

api.use('/api/v1', GameRoutes);

const handler = serverless(api);

module.exports.handler = async (event: Object, context: Object) => {
  const result = await handler(event, context);
  return result;
};
