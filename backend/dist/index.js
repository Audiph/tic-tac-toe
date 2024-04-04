"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Required environmental variables and configuration
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet_1 = require("helmet");
const logger = require("morgan");
const path = require("path");
const helpers_1 = require("./helpers");
const database_1 = require("./database");
const config_1 = require("./var/config");
const app = express();
// Database Connection
if (config_1.DATABASE_URL) {
    (0, database_1.default)(config_1.DATABASE_URL);
}
// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors());
// Models & Routes
(0, helpers_1.globFiles)(config_1.MODELS_DIR).forEach((model) => require(path.resolve(model)));
(0, helpers_1.globFiles)(config_1.ROUTES_DIR).forEach((route) => {
    const { default: Route } = require(path.resolve(route));
    new Route(app);
});
// Vercel compatible serverless function export
exports.default = (req, res) => {
    app(req, res);
};
//# sourceMappingURL=index.js.map