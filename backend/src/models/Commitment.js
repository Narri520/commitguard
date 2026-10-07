const mongoose = require('mongoose');

const commitmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    type: {
      type: String,
      enum: ['NORMAL', 'LOCATION_BASED'],
      default: 'NORMAL',
      index: true
    },
    location: {
      name: { type: String, default: null },
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
      radiusMeters: { type: Number, default: 100 }
    },
    category: {
      type: String,
      enum: ['Health', 'Study', 'Fitness', 'Work', 'Personal', 'Habits', 'Other'],
      default: 'Other',
      index: true
    },
    date: { type: String, required: true }, // e.g. "2026-09-25"
    time: { type: String, required: true }, // e.g. "20:00"
    deadline: { type: Date, required: true, index: true },
    scheduledAt: { type: Date, required: true, index: true },
    repeatSchedule: {
      type: String,
      enum: ['None', 'Daily', 'Weekly', 'Weekdays'],
      default: 'None'
    },
    proofRequired: { type: Boolean, default: true },
    proofType: {
      type: String,
      enum: ['image', 'text', 'location', 'qr', 'manual'],
      default: 'image'
    },
    penaltyAmount: { type: Number, required: true, min: 0 },
    penaltyDestination: {
      type: String,
      enum: ['Accountability Partner', 'Charity'],
      default: 'Accountability Partner'
    },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountabilityPartner' },
    charityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity' },
    status: {
      type: String,
      enum: [
        'CREATED',
        'SCHEDULED',
        'ACTIVE',
        'PROOF_SUBMITTED',
        'VERIFICATION_PENDING',
        'COMPLETED',
        'DEADLINE_PASSED',
        'MISSED',
        'PENALTY_PENDING',
        'PENALTY_PROCESSED'
      ],
      default: 'SCHEDULED',
      index: true
    },
    penaltyProcessed: { type: Boolean, default: false },
    idempotencyKey: { type: String, unique: true, sparse: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Commitment', commitmentSchema);

