"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable-next-line */
require('dotenv').config();
const http = require("http");
const config_1 = require("./var/config");
const server_1 = require("./server");
const awsServerlessExpress = require("aws-serverless-express");
const server = http.createServer(server_1.default);
const serverless = awsServerlessExpress.createServer(server_1.default);
server.listen(config_1.PORT);
server.on('error', (e) => {
    console.log('Error starting server' + e);
});
server.on('listening', () => {
    if (config_1.DATABASE_URL) {
        console.log(`Server started on port ${config_1.PORT} on env ${process.env.NODE_ENV || 'dev'} dbcon ${config_1.DATABASE_URL}`);
    }
    else {
        console.log(`Server started on port ${config_1.PORT} on env ${process.env.NODE_ENV || 'dev'}`);
    }
});
exports.handler = (event, context) => {
    awsServerlessExpress.proxy(serverless, event, context);
};
//# sourceMappingURL=index.js.map