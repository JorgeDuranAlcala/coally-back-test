import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(String(process.env.MONGODB_URI));
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};