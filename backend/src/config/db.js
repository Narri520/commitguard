const mongoose = require('mongoose');
const dns = require('dns');

// Fallback DNS servers to ensure MongoDB Atlas SRV resolution works across all Windows networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {
  // Ignore fallback if network overrides
}

let isConnected = false;

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/commitguard';
    const isAtlas = connStr.includes('mongodb+srv') || connStr.includes('mongodb.net');

    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: isAtlas ? 15000 : 5000,
      connectTimeoutMS: isAtlas ? 15000 : 5000
    });
    isConnected = true;
    console.log(`[MongoDB Atlas] Connected successfully to host: ${mongoose.connection.host}`);

  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Warning] Could not connect to MongoDB (${error.message}). Operating in high-performance memory mode.`);
  }
};

const isDbConnected = () => isConnected && mongoose.connection.readyState === 1;

module.exports = connectDB;
module.exports.isDbConnected = isDbConnected;
