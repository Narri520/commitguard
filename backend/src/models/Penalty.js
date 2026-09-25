const mongoose = require('mongoose');

const penaltySchema = new mongoose.Schema(
  {
    commitmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Commitment', required: true, unique: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    amount: { type: Number, required: true },
    destinationType: { type: String, enum: ['Accountability Partner', 'Charity'], required: true },
    recipientName: { type: String, required: true },
    recipientId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: String, enum: ['PENDING', 'PROCESSED', 'FAILED'], default: 'PENDING' },
    transactionId: { type: String }
  },
  { timestamps: true }
);

const Penalty = mongoose.model('Penalty', penaltySchema);

const transactionSchema = new mongoose.Schema(
  {
    penaltyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Penalty' },
    commitmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Commitment', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    recipient: { type: String, required: true },
    destinationType: { type: String, required: true },
    transactionRef: { type: String, required: true, unique: true }, // e.g. MOCK-TXN-102938
    status: { type: String, enum: ['SUCCESS', 'PENDING', 'FAILED'], default: 'SUCCESS' },
    isMock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

const accountabilityPartnerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: '' },
    upiId: { type: String, default: '' },
    relationship: { type: String, default: 'Friend' },
    totalPenaltiesReceived: { type: Number, default: 0 },
    missedCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const AccountabilityPartner = mongoose.model('AccountabilityPartner', accountabilityPartnerSchema);

const charitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Heart' },
    totalDonations: { type: Number, default: 0 },
    isDemo: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Charity = mongoose.model('Charity', charitySchema);

module.exports = { Penalty, Transaction, AccountabilityPartner, Charity };
