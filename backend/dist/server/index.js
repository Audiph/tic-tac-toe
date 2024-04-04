"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const helmet_1 = require("helmet");
const serverless = require("serverless-http");
const config_1 = require("../var/config");
const helpers_1 = require("../helpers");
const database_1 = require("../database");
const app = express();
for (const model of (0, helpers_1.globFiles)(config_1.MODELS_DIR)) {
    require(path.resolve(model));
}
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
for (const route of routes) {
    const { default: Route } = require(path.resolve(route));
    const _ = new Route(app);
}
exports.handler = serverless(app);
exports.default = app;
//# sourceMappingURL=index.js.map