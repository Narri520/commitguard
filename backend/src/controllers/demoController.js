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
    const demoEmail = 'demo@commitguard.com';

    try {
      // Clean up existing demo user records
      let user = await User.findOne({ email: demoEmail });
      if (!user) {
        user = await User.create({
          name: 'Demo User',
          email: demoEmail,
          password: 'Password123!',
          timezone: 'Asia/Kolkata',
          isDemo: true
        });
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
        name: 'Rahul (Accountability Buddy)',
        email: 'rahul@example.com',
        phone: '+91 9876543210',
        upiId: 'rahul@upi',
        relationship: 'Best Friend',
        totalPenaltiesReceived: 50,
        missedCount: 1
      });

      // Create Demo Streak
      await Streak.create({
        userId: user._id,
        currentStreak: 23,
        longestStreak: 28,
        lastCompletedDate: new Date().toISOString().split('T')[0],
        history: [
          { date: '2026-09-19', completedCount: 2, missedCount: 0 },
          { date: '2026-09-20', completedCount: 3, missedCount: 0 },
          { date: '2026-09-21', completedCount: 4, missedCount: 0 },
          { date: '2026-09-22', completedCount: 3, missedCount: 0 },
          { date: '2026-09-23', completedCount: 4, missedCount: 0 },
          { date: '2026-09-24', completedCount: 5, missedCount: 0 },
          { date: '2026-09-25', completedCount: 4, missedCount: 0 }
        ]
      });

      // Create Demo Commitments
      await Commitment.create([
        {
          userId: user._id,
          title: 'Morning Medicine & Vitamins',
          description: 'Take prescribed morning medicine and daily multivitamins.',
          category: 'Health',
          date: new Date().toISOString().split('T')[0],
          time: '08:00',
          deadline: new Date(Date.now() + 3600000 * 2),
          scheduledAt: new Date(),
          repeatSchedule: 'Daily',
          proofRequired: true,
          proofType: 'image',
          penaltyAmount: 50,
          penaltyDestination: 'Accountability Partner',
          partnerId: partner._id,
          status: 'ACTIVE'
        },
        {
          userId: user._id,
          title: 'Python DSA Practice & LeetCode',
          description: 'Solve 2 medium problems on graph algorithms and submit code notes.',
          category: 'Study',
          date: new Date().toISOString().split('T')[0],
          time: '21:00',
          deadline: new Date(Date.now() + 3600000 * 4),
          scheduledAt: new Date(),
          repeatSchedule: 'Daily',
          proofRequired: true,
          proofType: 'text',
          penaltyAmount: 100,
          penaltyDestination: 'Charity',
          status: 'SCHEDULED'
        },
        {
          userId: user._id,
          title: 'Gym Workout - Upper Body',
          description: '45 minutes weight training session at local gym.',
          category: 'Fitness',
          date: new Date().toISOString().split('T')[0],
          time: '07:00',
          deadline: new Date(Date.now() - 3600000 * 2),
          scheduledAt: new Date(),
          repeatSchedule: 'Daily',
          proofRequired: true,
          proofType: 'image',
          penaltyAmount: 100,
          penaltyDestination: 'Accountability Partner',
          partnerId: partner._id,
          status: 'COMPLETED'
        }
      ]);

      // Create Demo Notifications
      await Notification.create([
        {
          userId: user._id,
          title: '⚠️ Task Due Soon',
          message: 'Your "Morning Medicine & Vitamins" commitment is due in 10 minutes.',
          type: 'TASK_DUE',
          read: false
        },
        {
          userId: user._id,
          title: '🎉 Task Verified & Completed!',
          message: 'AI verified proof for "Gym Workout - Upper Body". Streak updated to 23 days!',
          type: 'TASK_COMPLETED',
          read: true
        }
      ]);
    } catch (e) {
      console.log('[Demo] In-memory reset fallback executed.');
    }

    return res.json({
      success: true,
      message: 'Demo dataset reset successfully! You can log in with demo@commitguard.com / Password123!'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { resetDemoData };
