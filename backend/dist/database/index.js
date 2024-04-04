"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.default = (uri) => {
    try {
        mongoose.connect(uri);
    }
    catch (e) {
        console.log('Error connecting to mongo db', e.message);
    }
};
//# sourceMappingURL=index.js.map