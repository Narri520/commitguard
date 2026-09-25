const { AccountabilityPartner } = require('../models');

let memoryPartners = [
  {
    _id: 'partner-1',
    userId: 'demo-user-123',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '+919876543210',
    upiId: 'rahul@upi',
    relationship: 'Best Friend',
    totalPenaltiesReceived: 150,
    missedCount: 3
  }
];

const getPartners = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    let partners;
    try {
      partners = await AccountabilityPartner.find({ userId });
    } catch (e) {
      partners = memoryPartners;
    }
    return res.json({ success: true, count: partners.length, data: partners });
  } catch (error) {
    next(error);
  }
};

const createPartner = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { name, email, phone, upiId, relationship } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required', errorCode: 'INVALID_INPUT' });
    }

    let partner;
    try {
      partner = await AccountabilityPartner.create({
        userId,
        name,
        email,
        phone: phone || '',
        upiId: upiId || '',
        relationship: relationship || 'Friend'
      });
    } catch (e) {
      partner = {
        _id: 'partner-' + Date.now(),
        userId,
        name,
        email,
        phone: phone || '',
        upiId: upiId || '',
        relationship: relationship || 'Friend',
        totalPenaltiesReceived: 0,
        missedCount: 0
      };
      memoryPartners.push(partner);
    }

    return res.status(201).json({ success: true, data: partner });
  } catch (error) {
    next(error);
  }
};

const updatePartner = async (req, res, next) => {
  try {
    const { id } = req.params;
    let partner;
    try {
      partner = await AccountabilityPartner.findByIdAndUpdate(id, req.body, { new: true });
    } catch (e) {
      const idx = memoryPartners.findIndex(p => p._id === id);
      if (idx !== -1) {
        memoryPartners[idx] = { ...memoryPartners[idx], ...req.body };
        partner = memoryPartners[idx];
      }
    }
    return res.json({ success: true, data: partner });
  } catch (error) {
    next(error);
  }
};

const deletePartner = async (req, res, next) => {
  try {
    const { id } = req.params;
    try {
      await AccountabilityPartner.findByIdAndDelete(id);
    } catch (e) {
      memoryPartners = memoryPartners.filter(p => p._id !== id);
    }
    return res.json({ success: true, message: 'Partner deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPartners, createPartner, updatePartner, deletePartner };
