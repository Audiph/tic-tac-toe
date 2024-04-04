import * as mongoose from 'mongoose';
export default (uri) => {
    try {
        mongoose.connect(uri);
    }
    catch (e) {
        console.log('Error connecting to mongo db', e.message);
    }
};
//# sourceMappingURL=index.js.map