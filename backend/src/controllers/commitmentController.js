const { Commitment, TaskSchedule } = require('../models');

// In-memory fallback commitments for demo mode
let memoryCommitments = [
  {
    _id: 'comm-1',
    userId: 'demo-user-123',
    title: 'Morning Medicine & Vitamins',
    description: 'Take prescribed morning blood pressure and daily multivitamin pills.',
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
    recipientName: 'Rahul',
    status: 'ACTIVE',
    penaltyProcessed: false,
    createdAt: new Date()
  },
  {
    _id: 'comm-2',
    userId: 'demo-user-123',
    title: 'Python DSA Practice & LeetCode',
    description: 'Solve 2 medium problems on graph algorithms and submit clean code notes.',
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
    status: 'SCHEDULED',
    penaltyProcessed: false,
    createdAt: new Date()
  },
  {
    _id: 'comm-3',
    userId: 'demo-user-123',
    title: 'Gym Workout - Upper Body',
    description: 'Complete 45 min strength training session.',
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
    status: 'COMPLETED',
    penaltyProcessed: false,
    createdAt: new Date()
  }
];

const getCommitments = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    let commitments;
    try {
      commitments = await Commitment.find({ userId }).sort({ deadline: 1 });
    } catch (e) {
      commitments = memoryCommitments.filter(c => c.userId === userId || userId === 'demo-user-123');
    }

    return res.json({ success: true, count: commitments.length, data: commitments });
  } catch (error) {
    next(error);
  }
};

const getCommitmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let commitment;
    try {
      commitment = await Commitment.findById(id);
    } catch (e) {
      commitment = memoryCommitments.find(c => c._id === id);
    }

    if (!commitment) {
      return res.status(404).json({ success: false, message: 'Commitment not found', errorCode: 'NOT_FOUND' });
    }

    return res.json({ success: true, data: commitment });
  } catch (error) {
    next(error);
  }
};

const createCommitment = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const {
      title,
      description,
      category,
      date,
      time,
      repeatSchedule,
      proofRequired,
      proofType,
      penaltyAmount,
      penaltyDestination,
      partnerId,
      charityId
    } = req.body;

    if (!title || !date || !time || penaltyAmount === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, date, time, and penalty amount',
        errorCode: 'INVALID_INPUT'
      });
    }

    // Calculate deadline timestamp
    const deadlineDate = new Date(`${date}T${time}:00`);

    let commitment;
    try {
      commitment = await Commitment.create({
        userId,
        title,
        description: description || '',
        category: category || 'Other',
        date,
        time,
        deadline: deadlineDate,
        scheduledAt: new Date(),
        repeatSchedule: repeatSchedule || 'None',
        proofRequired: proofRequired !== undefined ? proofRequired : true,
        proofType: proofType || 'image',
        penaltyAmount: Number(penaltyAmount),
        penaltyDestination: penaltyDestination || 'Accountability Partner',
        partnerId: partnerId || null,
        charityId: charityId || null,
        status: 'SCHEDULED'
      });

      // Schedule task reminder
      await TaskSchedule.create({
        commitmentId: commitment._id,
        userId,
        scheduledAt: deadlineDate
      });
    } catch (e) {
      // Memory fallback
      const fakeId = 'comm-' + Date.now();
      commitment = {
        _id: fakeId,
        id: fakeId,
        userId,
        title,
        description: description || '',
        category: category || 'Other',
        date,
        time,
        deadline: deadlineDate,
        scheduledAt: new Date(),
        repeatSchedule: repeatSchedule || 'None',
        proofRequired: proofRequired !== undefined ? proofRequired : true,
        proofType: proofType || 'image',
        penaltyAmount: Number(penaltyAmount),
        penaltyDestination: penaltyDestination || 'Accountability Partner',
        status: 'SCHEDULED',
        penaltyProcessed: false,
        createdAt: new Date()
      };
      memoryCommitments.push(commitment);
    }

    return res.status(201).json({ success: true, data: commitment });
  } catch (error) {
    next(error);
  }
};

const updateCommitment = async (req, res, next) => {
  try {
    const { id } = req.params;
    let commitment;
    try {
      commitment = await Commitment.findByIdAndUpdate(id, req.body, { new: true });
    } catch (e) {
      const idx = memoryCommitments.findIndex(c => c._id === id);
      if (idx !== -1) {
        memoryCommitments[idx] = { ...memoryCommitments[idx], ...req.body };
        commitment = memoryCommitments[idx];
      }
    }

    if (!commitment) {
      return res.status(404).json({ success: false, message: 'Commitment not found', errorCode: 'NOT_FOUND' });
    }

    return res.json({ success: true, data: commitment });
  } catch (error) {
    next(error);
  }
};

const deleteCommitment = async (req, res, next) => {
  try {
    const { id } = req.params;
    try {
      await Commitment.findByIdAndDelete(id);
    } catch (e) {
      memoryCommitments = memoryCommitments.filter(c => c._id !== id);
    }

    return res.json({ success: true, message: 'Commitment deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCommitments,
  getCommitmentById,
  createCommitment,
  updateCommitment,
  deleteCommitment,
  memoryCommitments
};
