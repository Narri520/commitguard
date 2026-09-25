const { Notification } = require('../models');

let memoryNotifications = [
  {
    _id: 'notif-1',
    userId: 'demo-user-123',
    title: '⚠️ Task Due Soon',
    message: 'Your "Morning Medicine & Vitamins" commitment is due in 10 minutes.',
    type: 'TASK_DUE',
    read: false,
    createdAt: new Date(Date.now() - 60000 * 15)
  },
  {
    _id: 'notif-2',
    userId: 'demo-user-123',
    title: '🎉 Task Completed!',
    message: 'AI verified proof for "Gym Workout - Upper Body". Streak updated to 23 days!',
    type: 'TASK_COMPLETED',
    read: true,
    createdAt: new Date(Date.now() - 3600000 * 3)
  },
  {
    _id: 'notif-3',
    userId: 'demo-user-123',
    title: '❌ Commitment Missed',
    message: 'Commitment "Evening Reading" was missed. ₹50 penalty sent to Rahul.',
    type: 'PENALTY_CREATED',
    read: false,
    createdAt: new Date(Date.now() - 86400000 * 2)
  }
];

const getNotifications = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    let notifications;
    try {
      notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    } catch (e) {
      notifications = memoryNotifications;
    }

    const unreadCount = notifications.filter(n => !n.read).length;

    return res.json({
      success: true,
      unreadCount,
      count: notifications.length,
      data: notifications
    });
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    try {
      await Notification.findByIdAndUpdate(id, { read: true });
    } catch (e) {
      const idx = memoryNotifications.findIndex(n => n._id === id);
      if (idx !== -1) memoryNotifications[idx].read = true;
    }

    return res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    next(error);
  }
};

const markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    try {
      await Notification.updateMany({ userId, read: false }, { read: true });
    } catch (e) {
      memoryNotifications.forEach(n => (n.read = true));
    }

    return res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotifications, markAsRead, markAllAsRead, memoryNotifications };
