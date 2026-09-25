const { Queue, Worker } = require('bullmq');
const penaltyService = require('../services/penaltyService');
const { Commitment, Notification } = require('../models');

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

let reminderQueue, deadlineQueue, penaltyQueue, notificationQueue;
let redisAvailable = false;

try {
  const connectionOptions = { host: '127.0.0.1', port: 6379, maxRetriesPerRequest: null };
  reminderQueue = new Queue('reminderQueue', { connection: connectionOptions });
  deadlineQueue = new Queue('deadlineQueue', { connection: connectionOptions });
  penaltyQueue = new Queue('penaltyQueue', { connection: connectionOptions });
  notificationQueue = new Queue('notificationQueue', { connection: connectionOptions });
  redisAvailable = true;
  console.log('[Queue] Redis BullMQ queues initialized.');
} catch (e) {
  console.warn('[Queue Warning] Redis server unavailable. Utilizing internal timer worker fallback for deadlines & notifications.');
}

// In-Memory deadline checker fallback loop
const startFallbackWorkerLoop = () => {
  setInterval(async () => {
    try {
      const now = new Date();
      // Find active commitments whose deadline has passed and haven't been completed or penalized
      const overdueCommitments = await Commitment.find({
        deadline: { $lte: now },
        status: { $in: ['SCHEDULED', 'ACTIVE', 'PROOF_SUBMITTED', 'VERIFICATION_PENDING'] },
        penaltyProcessed: false
      });

      for (const commitment of overdueCommitments) {
        console.log(`[Worker Fallback] Processing missed commitment: ${commitment.title} (${commitment._id})`);
        await penaltyService.processPenaltyForCommitment(commitment._id);
      }
    } catch (err) {
      // Ignored if DB offline
    }
  }, 30000); // Check every 30 seconds
};

const initWorkers = () => {
  if (redisAvailable) {
    try {
      const connectionOptions = { host: '127.0.0.1', port: 6379, maxRetriesPerRequest: null };
      
      new Worker('deadlineQueue', async (job) => {
        const { commitmentId } = job.data;
        await penaltyService.processPenaltyForCommitment(commitmentId);
      }, { connection: connectionOptions });

      new Worker('notificationQueue', async (job) => {
        const { userId, title, message, type } = job.data;
        await Notification.create({ userId, title, message, type });
      }, { connection: connectionOptions });
    } catch (e) {
      console.warn('[Queue Worker] BullMQ worker init fallback to interval loop.');
    }
  }

  // Always run fallback loop as backup safety net
  startFallbackWorkerLoop();
};

module.exports = {
  reminderQueue,
  deadlineQueue,
  penaltyQueue,
  notificationQueue,
  initWorkers
};
