import express from 'express';
import { isAuthenticated, isFarmer } from '../middlewares/auth.middleware.js';
import Crop from '../models/Crop.js';
import Order from '../models/Order.js';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validation.middleware.js';

const router = express.Router();


router.get('/crops', isAuthenticated, isFarmer, async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user.id });
    res.status(200).json({
      success: true,
      count: crops.length,
      data: crops
    });
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});


router.get('/crops/:id', isAuthenticated, isFarmer, async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    
    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }
    
   
    if (crop.farmer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this crop'
      });
    }
    
    res.status(200).json({
      success: true,
      data: crop
    });
  } catch (error) {
    console.error('Error fetching crop:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});


router.post('/crops', 
  isAuthenticated, 
  isFarmer,
  [
    body('name').notEmpty().withMessage('Crop name is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('quantityAvailable').isNumeric().withMessage('Quantity must be a number'),
    body('unit').notEmpty().withMessage('Unit is required')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const newCrop = new Crop({
        farmer: req.user.id,
        ...req.body
      });
      
      const savedCrop = await newCrop.save();
      
      res.status(201).json({
        success: true,
        data: savedCrop
      });
    } catch (error) {
      console.error('Error creating crop:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
);


router.put('/crops/:id', 
  isAuthenticated, 
  isFarmer,
  validateRequest,
  async (req, res) => {
    try {
      let crop = await Crop.findById(req.params.id);
      
      if (!crop) {
        return res.status(404).json({
          success: false,
          message: 'Crop not found'
        });
      }
      
     
      if (crop.farmer.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this crop'
        });
      }
      
      
      crop = await Crop.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      res.status(200).json({
        success: true,
        data: crop
      });
    } catch (error) {
      console.error('Error updating crop:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
);


router.delete('/crops/:id', isAuthenticated, isFarmer, async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    
    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }
    
    
    if (crop.farmer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this crop'
      });
    }
    
    await Crop.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Crop deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting crop:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});


router.get('/orders', isAuthenticated, isFarmer, async (req, res) => {
  try {
    const orders = await Order.findByFarmer(req.user.id);
    
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
