import express, { Application } from 'express';
import serverless from 'serverless-http';
import GameRoutes from '../../src/routes/games.server.route';

const api: Application = express();

api.use('/api/v1', GameRoutes);

export const handler = serverless(api);
