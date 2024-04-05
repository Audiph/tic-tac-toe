// src/database/index.ts or wherever your dbConnect function lives

import mongoose, { ConnectOptions } from 'mongoose';
import { DATABASE_URL } from '../var/config'; // Adjust this path as needed

// This object will persist across invocations of the Lambda function
const globalAny: any = global;

const connectDB = async () => {
  // Check if we're already connected or currently connecting
  if (globalAny.mongoConn && mongoose.connection.readyState === 1) {
    console.log('Using existing database connection');
    return globalAny.mongoConn;
  } else if (globalAny.mongoConnPromise) {
    console.log('Waiting for current database connection');
    await globalAny.mongoConnPromise;
    return globalAny.mongoConn;
  } else {
    console.log('Creating new database connection');
    globalAny.mongoConnPromise = mongoose
      .connect(DATABASE_URL, {
        bufferCommands: false,
      } as ConnectOptions)
      .then((conn) => {
        globalAny.mongoConn = conn;
        return conn;
      })
      .catch((error) => {
        // Reset connection promise to allow future retries if this one failed
        globalAny.mongoConnPromise = null;
        throw error;
      });

    await globalAny.mongoConnPromise;
    return globalAny.mongoConn;
  }
};

export default connectDB;
