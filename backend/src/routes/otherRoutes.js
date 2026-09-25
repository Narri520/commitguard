const express = require('express');
const { protect } = require('../middleware/auth');
const { getStreak, getAnalytics, getPenalties, getTransactions } = require('../controllers/streakController');
const { getPartners, createPartner, updatePartner, deletePartner } = require('../controllers/accountabilityController');
const { getCharities } = require('../controllers/charityController');
const { getNotifications, markAsRead, markAllAsRead } = require('../controllers/notificationController');
const { resetDemoData } = require('../controllers/demoController');

const streakRouter = express.Router();
streakRouter.get('/', protect, getStreak);

const analyticsRouter = express.Router();
analyticsRouter.get('/', protect, getAnalytics);

const penaltyRouter = express.Router();
penaltyRouter.get('/', protect, getPenalties);

const transactionRouter = express.Router();
transactionRouter.get('/', protect, getTransactions);

const accountabilityRouter = express.Router();
accountabilityRouter.use(protect);
accountabilityRouter.get('/', getPartners);
accountabilityRouter.post('/', createPartner);
accountabilityRouter.put('/:id', updatePartner);
accountabilityRouter.delete('/:id', deletePartner);

const charityRouter = express.Router();
charityRouter.get('/', getCharities);

const notificationRouter = express.Router();
notificationRouter.use(protect);
notificationRouter.get('/', getNotifications);
notificationRouter.put('/read-all', markAllAsRead);
notificationRouter.put('/:id/read', markAsRead);

const demoRouter = express.Router();
demoRouter.post('/reset', resetDemoData);

module.exports = {
  streakRouter,
  analyticsRouter,
  penaltyRouter,
  transactionRouter,
  accountabilityRouter,
  charityRouter,
  notificationRouter,
  demoRouter
};
