const { Streak, TaskCompletion, Notification } = require('../models');

class StreakService {
  async recordCompletion(userId, dateStr) {
    let streak;
    try {
      streak = await Streak.findOne({ userId });
      if (!streak) {
        streak = await Streak.create({
          userId,
          currentStreak: 0,
          longestStreak: 0,
          history: []
        });
      }

      const today = dateStr || new Date().toISOString().split('T')[0];

      // Check if already completed today
      if (streak.lastCompletedDate === today) {
        return streak;
      }

      // Check if last completed date was yesterday
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      if (streak.lastCompletedDate === yesterday || !streak.lastCompletedDate) {
        streak.currentStreak += 1;
      } else {
        // Reset streak
        streak.currentStreak = 1;
      }

      if (streak.currentStreak > streak.longestStreak) {
        streak.longestStreak = streak.currentStreak;
      }

      streak.lastCompletedDate = today;

      // Update history entry
      const existingHistoryIndex = streak.history.findIndex(h => h.date === today);
      if (existingHistoryIndex >= 0) {
        streak.history[existingHistoryIndex].completedCount += 1;
      } else {
        streak.history.push({ date: today, completedCount: 1, missedCount: 0 });
      }

      await streak.save();

      // Check milestone notifications (5, 10, 25, 50, 100 days)
      if ([3, 7, 14, 21, 30, 50, 100].includes(streak.currentStreak)) {
        await Notification.create({
          userId,
          title: '🔥 Streak Milestone Unlocked!',
          message: `Congratulations! You have reached a ${streak.currentStreak}-day commitment streak!`,
          type: 'STREAK_MILESTONE',
          metadata: { streakCount: streak.currentStreak }
        });
      }

      return streak;
    } catch (e) {
      return { currentStreak: 1, longestStreak: 1 };
    }
  }

  async recordMiss(userId, dateStr) {
    let streak;
    try {
      streak = await Streak.findOne({ userId });
      if (!streak) {
        streak = await Streak.create({ userId, currentStreak: 0, longestStreak: 0, history: [] });
      }

      const today = dateStr || new Date().toISOString().split('T')[0];
      streak.currentStreak = 0; // Streak breaks on miss

      const existingHistoryIndex = streak.history.findIndex(h => h.date === today);
      if (existingHistoryIndex >= 0) {
        streak.history[existingHistoryIndex].missedCount += 1;
      } else {
        streak.history.push({ date: today, completedCount: 0, missedCount: 1 });
      }

      await streak.save();
      return streak;
    } catch (e) {
      return { currentStreak: 0, longestStreak: 0 };
    }
  }
}

module.exports = new StreakService();
