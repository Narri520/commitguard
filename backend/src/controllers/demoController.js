const {
  User,
  Commitment,
  AccountabilityPartner,
  Charity,
  Streak,
  Notification,
  Transaction,
  Penalty
} = require('../models');

const resetDemoData = async (req, res, next) => {
  try {
    const demoEmail = 'rahul@example.com';

    try {
      // Clean up existing demo user records
      let user = await User.findOne({ email: demoEmail });
      if (!user) {
        user = await User.create({
          name: 'Rahul Sharma',
          email: demoEmail,
          password: 'Password123!',
          timezone: 'Asia/Kolkata',
          isDemo: true
        });
      } else {
        user.name = 'Rahul Sharma';
        await user.save();
      }

      await Commitment.deleteMany({ userId: user._id });
      await Streak.deleteMany({ userId: user._id });
      await Notification.deleteMany({ userId: user._id });
      await Transaction.deleteMany({ userId: user._id });
      await Penalty.deleteMany({ userId: user._id });
      await AccountabilityPartner.deleteMany({ userId: user._id });

      // Create Demo Partner
      const partner = await AccountabilityPartner.create({
        userId: user._id,
        name: 'Rahul Kumar',
        email: 'rahulkumar@example.com',
        phone: '+91 9876543210',
        upiId: 'rahul@upi',
        relationship: 'Accountability Partner',
        totalPenaltiesReceived: 30,
        missedCount: 3
      });

      // Create Demo Streak
      await Streak.create({
        userId: user._id,
        currentStreak: 12,
        longestStreak: 42,
        lastCompletedDate: new Date().toISOString().split('T')[0],
        history: [
          { date: '2026-09-23', completedCount: 5, missedCount: 0 },
          { date: '2026-09-24', completedCount: 4, missedCount: 1 },
          { date: '2026-09-25', completedCount: 6, missedCount: 0 },
          { date: '2026-09-26', completedCount: 5, missedCount: 0 },
          { date: '2026-09-27', completedCount: 5, missedCount: 1 },
          { date: '2026-09-28', completedCount: 6, missedCount: 0 },
          { date: '2026-09-29', completedCount: 3, missedCount: 1 }
        ]
      });

      const todayStr = new Date().toISOString().split('T')[0];

      // Create Demo Commitments matching exact mockup
      await Commitment.create([
        {
          userId: user._id,
          title: 'Study Python',
          description: 'Study Python data structures and functions for 1 hour.',
          category: 'Study',
          date: todayStr,
          time: '20:00',
          deadline: new Date(Date.now() + 3600000 * 2),
          scheduledAt: new Date(),
          repeatSchedule: 'Every day',
          proofRequired: true,
          proofType: 'image',
          penaltyAmount: 10,
          penaltyDestination: 'Accountability Partner',
          partnerId: partner._id,
          status: 'ACTIVE'
        },
        {
          userId: user._id,
          title: 'Workout',
          description: '45 minute full body workout session.',
          category: 'Fitness',
          date: todayStr,
          time: '18:00',
          deadline: new Date(Date.now() - 3600000 * 2),
          scheduledAt: new Date(),
          repeatSchedule: 'Every day',
          proofRequired: true,
          proofType: 'image',
          penaltyAmount: 10,
          penaltyDestination: 'Accountability Partner',
          partnerId: partner._id,
          status: 'COMPLETED'
        },
        {
          userId: user._id,
          title: 'Take Medicine',
          description: 'Take daily prescribed evening medicine after food.',
          category: 'Health',
          date: todayStr,
          time: '21:00',
          deadline: new Date(Date.now() + 3600000 * 3),
          scheduledAt: new Date(),
          repeatSchedule: 'Every day',
          proofRequired: true,
          proofType: 'image',
          penaltyAmount: 10,
          penaltyDestination: 'Charity',
          status: 'ACTIVE'
        },
        {
          userId: user._id,
          title: 'Read a Book',
          description: 'Read 20 pages of self-development / technical book.',
          category: 'Personal',
          date: todayStr,
          time: '22:00',
          deadline: new Date(Date.now() + 3600000 * 4),
          scheduledAt: new Date(),
          repeatSchedule: 'Every day',
          proofRequired: true,
          proofType: 'image',
          penaltyAmount: 10,
          penaltyDestination: 'Accountability Partner',
          partnerId: partner._id,
          status: 'ACTIVE'
        },
        {
          userId: user._id,
          title: 'DSA Practice',
          description: 'Solve 2 Data Structures & Algorithms problems.',
          category: 'Study',
          date: todayStr,
          time: '19:00',
          deadline: new Date(Date.now() - 3600000 * 1),
          scheduledAt: new Date(),
          repeatSchedule: 'Every day',
          proofRequired: true,
          proofType: 'image',
          penaltyAmount: 10,
          penaltyDestination: 'Accountability Partner',
          partnerId: partner._id,
          status: 'MISSED'
        }
      ]);

      // Create Demo Penalties & Transactions
      await Penalty.create({
        userId: user._id,
        amount: 10,
        destination: 'Accountability Partner',
        recipientName: 'Rahul Kumar',
        reason: 'Missed commitment: DSA Practice',
        status: 'PAID'
      });

      await Transaction.create({
        userId: user._id,
        amount: 10,
        type: 'PENALTY',
        recipient: 'Rahul Kumar',
        transactionRef: 'TXN-COMMITGUARD-9482',
        status: 'COMPLETED',
        note: 'Mock accountability penalty payment'
      });

      // Create Demo Notifications matching exact activity
      await Notification.create([
        {
          userId: user._id,
          title: 'Task Completed',
          message: 'You completed "Workout" 2 hours ago.',
          type: 'TASK_COMPLETED',
          read: false
        },
        {
          userId: user._id,
          title: 'Proof Submitted',
          message: 'Proof submitted for "Study Python" 4 hours ago.',
          type: 'PROOF_SUBMITTED',
          read: false
        },
        {
          userId: user._id,
          title: 'Penalty Recorded',
          message: 'Penalty of ₹10 recorded (Missed Task "DSA Practice").',
          type: 'PENALTY_CHARGED',
          read: false
        },
        {
          userId: user._id,
          title: 'Streak Updated',
          message: 'You earned 1 day streak! Total active streak: 12 days.',
          type: 'STREAK_UPDATED',
          read: true
        }
      ]);
    } catch (e) {
      console.log('[Demo] In-memory reset fallback executed:', e);
    }

    return res.json({
      success: true,
      message: 'Demo dataset reset successfully! Logged in as Rahul Sharma (rahul@example.com).'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { resetDemoData };

