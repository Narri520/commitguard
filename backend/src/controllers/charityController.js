const { Charity } = require('../models');

const defaultCharities = [
  {
    _id: 'charity-1',
    name: 'Education Support Initiative',
    category: 'Education',
    description: 'Provides books, school supplies, and scholarships to underprivileged children.',
    icon: 'BookOpen',
    totalDonations: 1250,
    isDemo: true
  },
  {
    _id: 'charity-2',
    name: 'Food Support & Hunger Relief',
    category: 'Hunger Relief',
    description: 'Distributes hot nutritious meals to families facing acute food insecurity.',
    icon: 'Utensils',
    totalDonations: 3400,
    isDemo: true
  },
  {
    _id: 'charity-3',
    name: 'Child Welfare Foundation',
    category: 'Healthcare',
    description: 'Provides critical pediatric healthcare, emergency medical aid, and shelter.',
    icon: 'HeartHandshake',
    totalDonations: 2100,
    isDemo: true
  },
  {
    _id: 'charity-4',
    name: 'Animal Rescue & Care Sanctuary',
    category: 'Animal Welfare',
    description: 'Rescues, rehabilitates, and feeds abandoned street animals and wildlife.',
    icon: 'PawPrint',
    totalDonations: 950,
    isDemo: true
  }
];

const getCharities = async (req, res, next) => {
  try {
    let charities;
    try {
      charities = await Charity.find({});
      if (charities.length === 0) {
        charities = await Charity.insertMany(defaultCharities);
      }
    } catch (e) {
      charities = defaultCharities;
    }

    return res.json({ success: true, count: charities.length, data: charities });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCharities };
