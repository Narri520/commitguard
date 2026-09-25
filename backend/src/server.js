require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const { initWorkers } = require('./workers/queue');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // 1. Connect MongoDB
  await connectDB();

  // 2. Initialize Background Queues / Workers
  initWorkers();

  // 3. Start Express HTTP Server
  app.listen(PORT, () => {
    console.log(`[Express Server] CommitGuard Main Backend running on port ${PORT}`);
    console.log(`[API Endpoint] http://localhost:${PORT}/api`);
  });
};

startServer();
