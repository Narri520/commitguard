const mongoose = require('mongoose');

const proofSubmissionSchema = new mongoose.Schema(
  {
    commitmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Commitment', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    proofType: { type: String, enum: ['image', 'text', 'location', 'qr', 'manual'], required: true },
    fileUrl: { type: String },
    textContent: { type: String },
    submittedAt: { type: Date, default: Date.now },
    verificationId: { type: mongoose.Schema.Types.ObjectId, ref: 'VerificationResult' }
  },
  { timestamps: true }
);

const ProofSubmission = mongoose.model('ProofSubmission', proofSubmissionSchema);

const verificationResultSchema = new mongoose.Schema(
  {
    proofId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProofSubmission', required: true, index: true },
    commitmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Commitment', required: true },
    verified: { type: Boolean, required: true },
    confidence: { type: Number, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['VERIFIED', 'NEEDS_REVIEW', 'REJECTED'], required: true },
    provider: { type: String, default: 'PythonAIProvider' },
    verifiedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const VerificationResult = mongoose.model('VerificationResult', verificationResultSchema);

module.exports = { ProofSubmission, VerificationResult };
