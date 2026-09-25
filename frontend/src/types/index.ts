export interface User {
  id: string;
  name: string;
  email: string;
  timezone: string;
  avatar?: string;
  isDemo?: boolean;
}

export type Category = 'Health' | 'Study' | 'Fitness' | 'Work' | 'Personal' | 'Habits' | 'Other';
export type ProofType = 'image' | 'text' | 'location' | 'qr' | 'manual';
export type PenaltyDestination = 'Accountability Partner' | 'Charity';

export type CommitmentStatus =
  | 'CREATED'
  | 'SCHEDULED'
  | 'ACTIVE'
  | 'PROOF_SUBMITTED'
  | 'VERIFICATION_PENDING'
  | 'COMPLETED'
  | 'DEADLINE_PASSED'
  | 'MISSED'
  | 'PENALTY_PENDING'
  | 'PENALTY_PROCESSED';

export interface Commitment {
  _id: string;
  id?: string;
  userId: string;
  title: string;
  description: string;
  category: Category;
  date: string;
  time: string;
  deadline: string;
  repeatSchedule: 'None' | 'Daily' | 'Weekly' | 'Weekdays';
  proofRequired: boolean;
  proofType: ProofType;
  penaltyAmount: number;
  penaltyDestination: PenaltyDestination;
  partnerId?: string;
  charityId?: string;
  status: CommitmentStatus;
  penaltyProcessed?: boolean;
  createdAt: string;
}

export interface VerificationResult {
  verified: boolean;
  confidence: number;
  reason: string;
  status: 'VERIFIED' | 'NEEDS_REVIEW' | 'REJECTED';
  provider: string;
}

export interface Streak {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: string;
  history: Array<{ date: string; completedCount: number; missedCount: number }>;
}

export interface NotificationItem {
  _id: string;
  title: string;
  message: string;
  type:
    | 'TASK_UPCOMING'
    | 'TASK_DUE'
    | 'DEADLINE_WARNING'
    | 'TASK_COMPLETED'
    | 'TASK_MISSED'
    | 'PENALTY_CREATED'
    | 'PAYMENT_PROCESSED'
    | 'STREAK_MILESTONE';
  read: boolean;
  createdAt: string;
}

export interface Transaction {
  _id: string;
  amount: number;
  currency: string;
  recipient: string;
  destinationType: string;
  transactionRef: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  isMock: boolean;
  createdAt: string;
}

export interface AccountabilityPartner {
  _id: string;
  name: string;
  email: string;
  phone: string;
  upiId: string;
  relationship: string;
  totalPenaltiesReceived: number;
  missedCount: number;
}

export interface Charity {
  _id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  totalDonations: number;
  isDemo: boolean;
}

export interface AnalyticsSummary {
  dailyCompletionRate: number;
  weeklyCompletionRate: number;
  monthlyCompletionRate: number;
  completedTasks: number;
  missedTasks: number;
  currentStreak: number;
  longestStreak: number;
  totalPenaltiesAmount: number;
  categoryDistribution: Array<{ name: string; value: number }>;
  weeklyTrend: Array<{ day: string; completed: number; missed: number }>;
}
