const { Commitment, ProofSubmission, VerificationResult, TaskCompletion, Notification } = require('../models');
const { getStorageService } = require('../services/storageService');
const aiService = require('../services/aiService');
const streakService = require('../services/streakService');
const { memoryCommitments } = require('./commitmentController');

const submitProof = async (req, res, next) => {
  try {
    const { id } = req.params; // commitmentId
    const userId = req.user._id || req.user.id;
    const { textContent, proofType } = req.body;

    let commitment;
    try {
      commitment = await Commitment.findById(id);
    } catch (e) {
      commitment = memoryCommitments.find(c => c._id === id);
    }

    if (!commitment) {
      return res.status(404).json({ success: false, message: 'Commitment not found', errorCode: 'NOT_FOUND' });
    }

    if (commitment.status === 'COMPLETED') {
      return res.status(400).json({ success: false, message: 'Task has already been completed', errorCode: 'ALREADY_COMPLETED' });
    }

    let fileUrl = '';
    const storageService = getStorageService();

    if (req.file) {
      const uploadResult = await storageService.uploadFile(req.file);
      fileUrl = uploadResult.url;
    }

    const currentProofType = proofType || commitment.proofType || 'image';

    // 1. Create Proof Record
    let proof;
    try {
      proof = await ProofSubmission.create({
        commitmentId: commitment._id,
        userId,
        proofType: currentProofType,
        fileUrl: fileUrl || req.body.fileUrl || 'http://localhost:5000/uploads/proof-demo.jpg',
        textContent: textContent || ''
      });
    } catch (e) {
      proof = {
        _id: 'proof-' + Date.now(),
        commitmentId: id,
        userId,
        proofType: currentProofType,
        fileUrl: fileUrl || 'http://localhost:5000/uploads/proof-demo.jpg',
        textContent: textContent || ''
      };
    }

    // 2. Call Python AI Microservice
    let aiResult;
    if (currentProofType === 'image') {
      aiResult = await aiService.verifyImageProof({
        task_type: commitment.category,
        task_description: commitment.description || commitment.title,
        proof_type: 'image',
        image_url: proof.fileUrl
      });
    } else {
      aiResult = await aiService.verifyTextProof({
        task_type: commitment.category,
        task_description: commitment.description || commitment.title,
        proof_type: 'text',
        text_content: textContent || 'Completed commitment as specified.'
      });
    }

    // 3. Store Verification Result
    let verification;
    try {
      verification = await VerificationResult.create({
        proofId: proof._id,
        commitmentId: commitment._id,
        verified: aiResult.verified,
        confidence: aiResult.confidence,
        reason: aiResult.reason,
        status: aiResult.status,
        provider: aiResult.provider || 'PythonAIService'
      });
    } catch (e) {
      verification = {
        _id: 'verif-' + Date.now(),
        verified: aiResult.verified,
        confidence: aiResult.confidence,
        reason: aiResult.reason,
        status: aiResult.status
      };
    }

    // 4. Update Task State Machine
    if (aiResult.verified) {
      commitment.status = 'COMPLETED';
      try {
        await commitment.save();
        await TaskCompletion.create({
          commitmentId: commitment._id,
          userId,
          status: 'COMPLETED',
          proofId: proof._id
        });
      } catch (e) {
        const idx = memoryCommitments.findIndex(c => c._id === id);
        if (idx !== -1) memoryCommitments[idx].status = 'COMPLETED';
      }

      // Update Streaks
      const streakInfo = await streakService.recordCompletion(userId);

      // Create Notification
      try {
        await Notification.create({
          userId,
          title: '🎉 Task Verified & Completed!',
          message: `AI verified proof for "${commitment.title}" (Confidence: ${Math.round(aiResult.confidence * 100)}%). Streak updated!`,
          type: 'TASK_COMPLETED',
          metadata: { commitmentId: commitment._id }
        });
      } catch (e) {}

      return res.json({
        success: true,
        message: 'Proof verified successfully!',
        verification: aiResult,
        commitment,
        streak: streakInfo
      });
    } else {
      commitment.status = 'VERIFICATION_PENDING';
      try {
        await commitment.save();
      } catch (e) {}

      return res.status(422).json({
        success: false,
        message: 'Proof rejected or needs manual review',
        verification: aiResult,
        commitment
      });
    }
  } catch (error) {
    next(error);
  }
};

const getProofByCommitment = async (req, res, next) => {
  try {
    const { id } = req.params;
    let proofs;
    try {
      proofs = await ProofSubmission.find({ commitmentId: id });
    } catch (e) {
      proofs = [];
    }

    return res.json({ success: true, data: proofs });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitProof, getProofByCommitment };
