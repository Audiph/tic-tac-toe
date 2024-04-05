"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable-next-line */
require('dotenv').config();
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./var/config");
const database_1 = __importDefault(require("./database"));
const games_server_route_1 = __importDefault(require("./routes/games.server.route"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use((0, cors_1.default)({
    origin: 'https://tic-tac-toe-client-rose.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false,
}));
app.use('/api/v1', games_server_route_1.default);
app.listen(config_1.PORT || 5000, () => {
    if (config_1.DATABASE_URL) {
        (0, database_1.default)();
        console.log(`Server started on port ${config_1.PORT} on env ${process.env.NODE_ENV || 'dev'}`);
    }
    else {
        console.log(`Server started on port ${config_1.PORT} on env ${process.env.NODE_ENV || 'dev'}`);
    }
});
//# sourceMappingURL=index.js.map