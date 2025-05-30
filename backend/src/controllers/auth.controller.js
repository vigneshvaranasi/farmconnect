import { validationResult } from 'express-validator';
import Customer from '../models/Customer.js';
import Trader from '../models/Trader.js';
import Farmer from '../models/Farmer.js';
import { generateToken } from '../utils/jwt.js';


export const registerCustomer = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { name, phoneNumber, aadharNumber, email, address, password } = req.body;

    
    const existingCustomer = await Customer.findOne({
      $or: [
        { phoneNumber },
        { aadharNumber },
        { email }
      ]
    });

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: 'Customer with this phone, aadhar, or email already exists'
      });
    }

    
    const customer = new Customer({
      name,
      phoneNumber,
      aadharNumber,
      email,
      address,
      password
    });

    await customer.save();

   
    const token = generateToken(customer._id, 'customer');

    res.status(201).json({
      success: true,
      message: 'Customer registered successfully',
      data: {
        user: {
          id: customer._id,
          name: customer.name,
          phoneNumber: customer.phoneNumber,
          email: customer.email,
          userType: customer.userType
        },
        token
      }
    });
  } catch (error) {
    console.error('Register customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};


export const registerTrader = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { name, phoneNumber, aadharNumber, email, address, password } = req.body;

    
    const existingTrader = await Trader.findOne({
      $or: [
        { phoneNumber },
        { aadharNumber },
        { email }
      ]
    });

    if (existingTrader) {
      return res.status(400).json({
        success: false,
        message: 'Trader with this phone, aadhar, or email already exists'
      });
    }

   
    const trader = new Trader({
      name,
      phoneNumber,
      aadharNumber,
      email,
      address,
      password
    });

    await trader.save();

    
    const token = generateToken(trader._id, 'trader');

    res.status(201).json({
      success: true,
      message: 'Trader registered successfully',
      data: {
        user: {
          id: trader._id,
          name: trader.name,
          phoneNumber: trader.phoneNumber,
          email: trader.email,
          userType: trader.userType
        },
        token
      }
    });
  } catch (error) {
    console.error('Register trader error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};


export const login = async (req, res) => {
  try {
    console.log('Login attempt for phone:', req.body.phoneNumber, 'userType:', req.body.userType);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }    const { phoneNumber, password, userType: requestedUserType } = req.body;
    console.log('Processing login for:', phoneNumber, 'as', requestedUserType);

    
    let user = null;
    let userType = null;

    
    console.log('Searching for customer...');
    user = await Customer.findOne({ phoneNumber });
    if (user) {
      userType = 'customer';
      console.log('Found customer:', user.name);
    } else {
      
      console.log('Searching for trader...');
      user = await Trader.findOne({ phoneNumber });
      if (user) {
        userType = 'trader';
        console.log('Found trader:', user.name);
      } else {
        
        console.log('Searching for farmer...');
        user = await Farmer.findOne({ phoneNumber });
        if (user) {
          userType = 'farmer';
          console.log('Found farmer:', user.name, 'isApproved:', user.isApproved);
          
          if (!user.isApproved) {
            console.log('Farmer not approved');
            return res.status(403).json({
              success: false,
              message: 'Your farmer account is not yet approved'
            });
          }
        }
      }
    }    if (!user) {
      console.log('No user found with phone number:', phoneNumber);
      return res.status(401).json({
        success: false,
        message: 'Invalid phone number or password'
      });
    }

    console.log('Checking password for user:', user.name);
    
    const isPasswordMatch = await user.matchPassword(password);
    console.log('Password match result:', isPasswordMatch);
    if (!isPasswordMatch) {
      console.log('Password mismatch for user:', user.name);
      return res.status(401).json({
        success: false,
        message: 'Invalid phone number or password'
      });
    }

    console.log('Login successful for:', user.name, 'userType:', userType);

   
    const token = generateToken(user._id, userType);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          email: user.email,
          userType: userType
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};


export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
