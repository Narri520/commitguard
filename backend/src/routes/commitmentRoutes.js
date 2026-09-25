const express = require('express');
const { register, login, logout, getMe, updatePassword } = require('../controllers/authController');
const {
  getCommitments,
  getCommitmentById,
  createCommitment,
  updateCommitment,
  deleteCommitment
} = require('../controllers/commitmentController');
const { protect } = require('../middleware/auth');

const authRouter = express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/me', protect, getMe);
authRouter.put('/password', protect, updatePassword);

const userRouter = express.Router();
userRouter.get('/me', protect, getMe);
userRouter.put('/me', protect, (req, res) => res.json({ success: true, user: { ...req.user, ...req.body } }));

const commitmentRouter = express.Router();
commitmentRouter.use(protect);
commitmentRouter.get('/', getCommitments);
commitmentRouter.post('/', createCommitment);
commitmentRouter.get('/:id', getCommitmentById);
commitmentRouter.put('/:id', updateCommitment);
commitmentRouter.delete('/:id', deleteCommitment);

module.exports = { authRouter, userRouter, commitmentRouter };
