const { Commitment, Penalty, Transaction, AccountabilityPartner, Charity, Notification } = require('../models');
const mockPaymentService = require('./paymentService');

class PenaltyService {
  async processPenaltyForCommitment(commitmentId) {
    let commitment;
    try {
      commitment = await Commitment.findById(commitmentId);
    } catch (e) {
      // Handled if DB offline
    }

    if (!commitment) {
      return { success: false, message: 'Commitment not found' };
    }

    // Check if task completed or already penalized
    if (commitment.status === 'COMPLETED') {
      return { success: false, message: 'Task already completed, penalty skipped' };
    }

    // Prevent duplicate penalties
    let existingPenalty;
    try {
      existingPenalty = await Penalty.findOne({ commitmentId: commitment._id });
    } catch (e) {}

    if (existingPenalty || commitment.penaltyProcessed) {
      return { success: false, message: 'Penalty already processed for this commitment' };
    }

    // Determine recipient
    let recipientName = 'Default Partner';
    let recipientId = null;

    if (commitment.penaltyDestination === 'Accountability Partner' && commitment.partnerId) {
      try {
        const partner = await AccountabilityPartner.findById(commitment.partnerId);
        if (partner) {
          recipientName = partner.name;
          recipientId = partner._id;
          partner.totalPenaltiesReceived += commitment.penaltyAmount;
          partner.missedCount += 1;
          await partner.save();
        }
      } catch (e) {}
    } else if (commitment.penaltyDestination === 'Charity' && commitment.charityId) {
      try {
        const charity = await Charity.findById(commitment.charityId);
        if (charity) {
          recipientName = charity.name;
          recipientId = charity._id;
          charity.totalDonations += commitment.penaltyAmount;
          await charity.save();
        }
      } catch (e) {}
    }

    // Execute Payment
    const paymentResult = await mockPaymentService.createTransaction(
      commitment.penaltyAmount,
      recipientName,
      commitment.penaltyDestination
    );

    // Save Penalty
    let penalty;
    try {
      penalty = await Penalty.create({
        commitmentId: commitment._id,
        userId: commitment.userId,
        amount: commitment.penaltyAmount,
        destinationType: commitment.penaltyDestination,
        recipientName: recipientName,
        recipientId: recipientId,
        status: 'PROCESSED',
        transactionId: paymentResult.transactionId
      });

      await Transaction.create({
        penaltyId: penalty._id,
        commitmentId: commitment._id,
        userId: commitment.userId,
        amount: commitment.penaltyAmount,
        recipient: recipientName,
        destinationType: commitment.penaltyDestination,
        transactionRef: paymentResult.transactionId,
        status: 'SUCCESS',
        isMock: true
      });
    } catch (e) {}

    // Update Commitment
    commitment.status = 'MISSED';
    commitment.penaltyProcessed = true;
    try {
      await commitment.save();
    } catch (e) {}

    // Create Notification
    try {
      await Notification.create({
        userId: commitment.userId,
        title: 'Commitment Missed',
        message: `❌ Commitment "${commitment.title}" was missed. Penalty of ₹${commitment.penaltyAmount} sent to ${recipientName}.`,
        type: 'PENALTY_CREATED',
        metadata: { commitmentId: commitment._id, amount: commitment.penaltyAmount, recipientName }
      });
    } catch (e) {}

    return {
      success: true,
      penalty,
      paymentResult
    };
  }
}

module.exports = new PenaltyService();
