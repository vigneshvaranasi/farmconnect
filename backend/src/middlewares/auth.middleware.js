import { verifyToken, extractToken } from '../utils/jwt.js';
import Customer from '../models/Customer.js';
import Trader from '../models/Trader.js';
import Farmer from '../models/Farmer.js';


export const protect = async (req, res, next) => {
  try {
    const token = extractToken(req);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Access denied.'
      });
    }

    const decoded = verifyToken(token);
    
    
    let user;
    switch (decoded.userType) {
      case 'customer':
        user = await Customer.findById(decoded.userId).select('-password');
        break;
      case 'trader':
        user = await Trader.findById(decoded.userId).select('-password');
        break;
      case 'farmer':
        user = await Farmer.findById(decoded.userId).select('-password');
        break;
      default:
        return res.status(401).json({
          success: false,
          message: 'Invalid user type'
        });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed'
    });
  }
};


export const authorize = (...userTypes) => {
  return (req, res, next) => {
    if (!userTypes.includes(req.user.userType)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }
    next();
  };
};


export const checkFarmerApproval = (req, res, next) => {
  if (req.user.userType === 'farmer' && !req.user.isApproved) {
    return res.status(403).json({
      success: false,
      message: 'Your farmer account is not yet approved'
    });
  }
  next();
};


export const isAuthenticated = protect;


export const isFarmer = (req, res, next) => {
  if (req.user.userType !== 'farmer') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Only farmers can access this resource.'
    });
  }
  
  
  if (!req.user.isApproved) {
    return res.status(403).json({
      success: false,
      message: 'Your farmer account is not yet approved.'
    });
  }
  
  next();
};
