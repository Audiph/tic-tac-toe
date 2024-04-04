/* tslint:disable-next-line */
require('dotenv').config();
import * as http from 'http';
import { DATABASE_URL, PORT } from './var/config';
import app from './server';
const server = http.createServer(app);
server.listen(PORT);
server.on('error', (e) => {
    console.log('Error starting server' + e);
});
server.on('listening', () => {
    if (DATABASE_URL) {
        console.log(`Server started on port ${PORT} on env ${process.env.NODE_ENV || 'dev'} dbcon ${DATABASE_URL}`);
    }
    else {
        console.log(`Server started on port ${PORT} on env ${process.env.NODE_ENV || 'dev'}`);
    }
});
export default {
    server,
};
//# sourceMappingURL=index.js.map