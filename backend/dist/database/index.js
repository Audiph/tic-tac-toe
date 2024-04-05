"use strict";
// src/database/index.ts or wherever your dbConnect function lives
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../var/config"); // Adjust this path as needed
// This object will persist across invocations of the Lambda function
const globalAny = global;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // Check if we're already connected or currently connecting
    if (globalAny.mongoConn && mongoose_1.default.connection.readyState === 1) {
        console.log('Using existing database connection');
        return globalAny.mongoConn;
    }
    else if (globalAny.mongoConnPromise) {
        console.log('Waiting for current database connection');
        yield globalAny.mongoConnPromise;
        return globalAny.mongoConn;
    }
    else {
        console.log('Creating new database connection');
        globalAny.mongoConnPromise = mongoose_1.default
            .connect(config_1.DATABASE_URL, {
            bufferCommands: false,
        })
            .then((conn) => {
            globalAny.mongoConn = conn;
            return conn;
        })
            .catch((error) => {
            // Reset connection promise to allow future retries if this one failed
            globalAny.mongoConnPromise = null;
            throw error;
        });
        yield globalAny.mongoConnPromise;
        return globalAny.mongoConn;
    }
});
exports.default = connectDB;
//# sourceMappingURL=index.js.map