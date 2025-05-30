import { validationResult } from 'express-validator';
import Farmer from '../models/Farmer.js';
import { generateToken } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';


export const requestCredentials = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { aadharNumber, bankAccountNumber, ifscCode, address, phoneNumber } = req.body;

    
    const existingFarmer = await Farmer.findOne({
      $or: [
        { aadharNumber },
        { phoneNumber },
        { bankAccountNumber }
      ]
    });

    if (existingFarmer) {
      return res.status(400).json({
        success: false,
        message: 'Farmer with this aadhar, phone, or bank account already exists'
      });
    }

    
    const farmer = new Farmer({
      aadharNumber,
      bankAccountNumber,
      ifscCode,
      address,
      phoneNumber,
      requestStatus: 'pending'
    });

    await farmer.save();

    res.status(201).json({
      success: true,
      message: 'Farmer credential request submitted successfully. Please wait for approval.',
      data: {
        requestId: farmer._id,
        phoneNumber: farmer.phoneNumber,
        status: farmer.requestStatus
      }
    });
  } catch (error) {
    console.error('Request credentials error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};


export const approveCredentials = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const { name, email, password } = req.body;

    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer request not found'
      });
    }

    if (farmer.requestStatus === 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Farmer is already approved'
      });
    }

    
    farmer.name = name;
    farmer.email = email;
    farmer.password = password;
    farmer.isApproved = true;
    farmer.requestStatus = 'approved';
    farmer.approvedAt = new Date();

    await farmer.save();

    res.status(200).json({
      success: true,
      message: 'Farmer credentials approved successfully',
      data: {
        farmerId: farmer._id,
        name: farmer.name,
        phoneNumber: farmer.phoneNumber,
        email: farmer.email
      }
    });
  } catch (error) {
    console.error('Approve credentials error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};


export const rejectCredentials = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const { rejectionReason } = req.body;

    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer request not found'
      });
    }

    if (farmer.requestStatus === 'rejected') {
      return res.status(400).json({
        success: false,
        message: 'Farmer request is already rejected'
      });
    }

    
    farmer.requestStatus = 'rejected';
    farmer.rejectedAt = new Date();
    farmer.rejectionReason = rejectionReason || 'No reason provided';

    await farmer.save();

    res.status(200).json({
      success: true,
      message: 'Farmer credentials rejected',
      data: {
        farmerId: farmer._id,
        rejectionReason: farmer.rejectionReason
      }
    });
  } catch (error) {
    console.error('Reject credentials error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};


export const getFarmerRequests = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      filter.requestStatus = status;
    }

    const farmers = await Farmer.find(filter)
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        farmers,
        count: farmers.length
      }
    });
  } catch (error) {
    console.error('Get farmer requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};


export const checkRequestStatus = async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    const farmer = await Farmer.findOne({ phoneNumber })
      .select('-password -bankAccountNumber -ifscCode');

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'No farmer request found with this phone number'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        requestId: farmer._id,
        phoneNumber: farmer.phoneNumber,
        status: farmer.requestStatus,
        isApproved: farmer.isApproved,
        createdAt: farmer.createdAt,
        approvedAt: farmer.approvedAt,
        rejectedAt: farmer.rejectedAt,
        rejectionReason: farmer.rejectionReason
      }
    });
  } catch (error) {
    console.error('Check request status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
