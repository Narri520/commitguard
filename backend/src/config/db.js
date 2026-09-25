const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/commitguard';
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 500, // Fast 500ms timeout if local MongoDB isn't running
      connectTimeoutMS: 500
    });
    isConnected = true;
    console.log(`[MongoDB] Connected: ${mongoose.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Warning] Could not connect to MongoDB (${error.message}). Operating in high-performance memory mode.`);
  }
};

const isDbConnected = () => isConnected && mongoose.connection.readyState === 1;

module.exports = connectDB;
module.exports.isDbConnected = isDbConnected;
