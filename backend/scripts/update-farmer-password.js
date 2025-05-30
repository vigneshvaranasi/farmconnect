import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';


dotenv.config();


import Farmer from '../src/models/Farmer.js';


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};


const updateFarmerPassword = async () => {
  try {
    await connectDB();
    
    console.log('Updating farmer password...');
    
    
    const farmer = await Farmer.findOne({ phoneNumber: '8765432109' });
    
    if (!farmer) {
      console.log('Farmer not found');
      process.exit(1);
    }
    
    
    farmer.password = 'farmer123';
    await farmer.save();
    
    console.log('Updated farmer password successfully!');
    console.log(`Farmer: ${farmer.name} (Phone: ${farmer.phoneNumber})`);
    console.log('New password: farmer123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating farmer password:', error.message);
    process.exit(1);
  }
};


updateFarmerPassword();
