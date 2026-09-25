const { verifyToken } = require('../utils/jwt');
const { User } = require('../models');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
      errorCode: 'NO_TOKEN'
    });
  }

  try {
    const decoded = verifyToken(token);
    
    // Check MongoDB user
    let user = null;
    try {
      user = await User.findById(decoded.id).select('-password');
    } catch (e) {
      // Ignored if DB offline
    }

    if (!user) {
      // Fallback demo user if DB offline or user not found
      user = {
        _id: decoded.id || 'demo-user-123',
        id: decoded.id || 'demo-user-123',
        name: 'Demo User',
        email: 'demo@commitguard.com',
        timezone: 'UTC',
        isDemo: true
      };
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed or expired',
      errorCode: 'INVALID_TOKEN'
    });
  }
};

module.exports = { protect };
