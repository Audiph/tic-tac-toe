"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globFiles = void 0;
const glob_1 = require("glob");
const lodash_1 = require("lodash");
const globFiles = (location) => {
    return (0, lodash_1.union)([], (0, glob_1.sync)(location));
};
exports.globFiles = globFiles;
//# sourceMappingURL=index.js.map