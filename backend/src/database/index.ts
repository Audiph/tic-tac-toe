import mongoose, { ConnectOptions } from 'mongoose';
import { DATABASE_URL } from '../var/config';

// mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(
      DATABASE_URL as string,
      {
        bufferCommands: false,
      } as ConnectOptions
    );
    console.log('Database is connected');
  } catch (error: any) {
    console.log(error.message);
  }
};

export default connectDB;
