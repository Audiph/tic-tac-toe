import { sync } from 'glob';
import { union } from 'lodash';
export const globFiles = (location) => {
    return union([], sync(location));
};
//# sourceMappingURL=index.js.map