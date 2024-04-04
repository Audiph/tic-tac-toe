"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODELS_DIR = exports.ROUTES_DIR = exports.PORT = exports.DATABASE_URL = void 0;
_a = process.env, exports.DATABASE_URL = _a.DATABASE_URL, exports.PORT = _a.PORT;
exports.ROUTES_DIR = './dist/routes/**/*.js';
exports.MODELS_DIR = './dist/models/**/*.js';
//# sourceMappingURL=config.js.map