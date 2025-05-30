import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Farmer from '../src/models/Farmer.js';


dotenv.config();

const fixFarmerPassword = async () => {
  try {
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    
    const farmer = await Farmer.findOne({ phoneNumber: '8765432109' });
    
    if (!farmer) {
      console.log('Farmer with phone 8765432109 not found');
      process.exit(1);
    }
    
    console.log('Found farmer:', farmer.name);
    console.log('Current password hash:', farmer.password);
    
    
    const currentValid = await farmer.matchPassword('farmer123');
    console.log('Current password valid:', currentValid);
    
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('farmer123', salt);
    
    console.log('New password hash:', hashedPassword);
    
    
    farmer.password = hashedPassword;
    await farmer.save();
    
    console.log(' Password updated successfully!');
    
    
    const newValid = await farmer.matchPassword('farmer123');
    console.log('New password valid:', newValid);
    
    process.exit(0);
  } catch (error) {
    console.error('Error fixing farmer password:', error);
    process.exit(1);
  }
};

fixFarmerPassword();
