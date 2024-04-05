"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let cached = global.mongooseConn;
if (!cached) {
    cached = global.mongooseConn = { conn: null, promise: null };
}
const connectDB = async (uri) => {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose_1.default.connect(uri, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
};
exports.default = connectDB;
//# sourceMappingURL=index.js.map