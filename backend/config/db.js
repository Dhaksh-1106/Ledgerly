const mongoose = require('mongoose');
// require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const connectDB = async () => {
  try {
    // if (!process.env.MONGO_URI) {
    //   throw new Error('MONGO_URI is not defined');
    // }

    const connection = await mongoose.connect("mongodb://localhost:27017");
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
