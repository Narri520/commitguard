const mongoose = require('mongoose');

const taskScheduleSchema = new mongoose.Schema(
  {
    commitmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Commitment', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    scheduledAt: { type: Date, required: true, index: true },
    reminderSent: { type: Boolean, default: false },
    status: { type: String, default: 'PENDING' }
  },
  { timestamps: true }
);

const TaskSchedule = mongoose.model('TaskSchedule', taskScheduleSchema);

const taskCompletionSchema = new mongoose.Schema(
  {
    commitmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Commitment', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    completedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['COMPLETED', 'MISSED'], required: true },
    proofId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProofSubmission' }
  },
  { timestamps: true }
);

const TaskCompletion = mongoose.model('TaskCompletion', taskCompletionSchema);

module.exports = { TaskSchedule, TaskCompletion };
