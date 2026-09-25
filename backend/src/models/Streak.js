const mongoose = require('mongoose');

const streakSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastCompletedDate: { type: String }, // "YYYY-MM-DD"
    history: [
      {
        date: { type: String, required: true },
        completedCount: { type: Number, default: 0 },
        missedCount: { type: Number, default: 0 }
      }
    ]
  },
  { timestamps: true }
);

const Streak = mongoose.model('Streak', streakSchema);

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: [
        'TASK_UPCOMING',
        'TASK_DUE',
        'DEADLINE_WARNING',
        'TASK_COMPLETED',
        'TASK_MISSED',
        'PENALTY_CREATED',
        'PAYMENT_PROCESSED',
        'STREAK_MILESTONE'
      ],
      required: true,
      index: true
    },
    read: { type: Boolean, default: false, index: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

const notificationPreferenceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    emailNotifications: { type: Boolean, default: true },
    partnerAlerts: { type: Boolean, default: true },
    reminderMinutesBefore: { type: Number, default: 15 }
  },
  { timestamps: true }
);

const NotificationPreference = mongoose.model('NotificationPreference', notificationPreferenceSchema);

const auditLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    action: { type: String, required: true },
    details: { type: mongoose.Schema.Types.Mixed },
    ip: { type: String },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = { Streak, Notification, NotificationPreference, AuditLog };
