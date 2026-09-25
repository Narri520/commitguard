const express = require('express');
const { authRouter, userRouter, commitmentRouter } = require('./commitmentRoutes');
const proofRouter = require('./proofRoutes');
const {
  streakRouter,
  analyticsRouter,
  penaltyRouter,
  transactionRouter,
  accountabilityRouter,
  charityRouter,
  notificationRouter,
  demoRouter
} = require('./otherRoutes');

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/commitments', commitmentRouter);
apiRouter.use('/commitments', proofRouter);
apiRouter.use('/streaks', streakRouter);
apiRouter.use('/analytics', analyticsRouter);
apiRouter.use('/penalties', penaltyRouter);
apiRouter.use('/transactions', transactionRouter);
apiRouter.use('/accountability', accountabilityRouter);
apiRouter.use('/charities', charityRouter);
apiRouter.use('/notifications', notificationRouter);
apiRouter.use('/demo', demoRouter);

module.exports = apiRouter;
