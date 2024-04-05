"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable-next-line */
require('dotenv').config();
const http = require("http");
const awsServerlessExpress = require("aws-serverless-express");
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const helmet_1 = require("helmet");
const config_1 = require("./var/config");
const helpers_1 = require("./helpers");
const database_1 = require("./database");
const app = express();
if (config_1.DATABASE_URL) {
    (0, database_1.default)(config_1.DATABASE_URL);
}
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors());
const routes = (0, helpers_1.globFiles)(config_1.ROUTES_DIR);
for (const model of (0, helpers_1.globFiles)(config_1.MODELS_DIR)) {
    require(path.resolve(model));
}
for (const route of routes) {
    const { default: Route } = require(path.resolve(route));
    const _ = new Route(app);
    app.use(_);
}
const server = http.createServer(app);
const serverless = awsServerlessExpress.createServer(app);
// server.listen(PORT);
// server.on('error', (e: Error) => {
//   console.log('Error starting server' + e);
// });
// server.on('listening', () => {
//   if (DATABASE_URL) {
//     console.log(
//       `Server started on port ${PORT} on env ${
//         process.env.NODE_ENV || 'dev'
//       } dbcon ${DATABASE_URL}`
//     );
//   } else {
//     console.log(
//       `Server started on port ${PORT} on env ${process.env.NODE_ENV || 'dev'}`
//     );
//   }
// });
exports.handler = (event, context) => {
    awsServerlessExpress.proxy(serverless, event, context);
};
exports.default = serverless;
//# sourceMappingURL=index.js.map