import mongoose from 'mongoose';
import Farmer from './src/models/Farmer.js';
import dotenv from 'dotenv';

dotenv.config();

const checkDemoFarmers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
   
    console.log('\n=== Demo Farmers Status ===');
    
    const farmer1 = await Farmer.findOne({ phoneNumber: '9876543210' });
    const farmer2 = await Farmer.findOne({ phoneNumber: '8765432109' });
    
    console.log('Farmer 1 (9876543210):', farmer1 ? 'Found' : 'Not found');
    if (farmer1) {
      console.log('  Name:', farmer1.name);
      console.log('  Email:', farmer1.email);
      console.log('  Is Approved:', farmer1.isApproved);
      console.log('  Request Status:', farmer1.requestStatus);
      console.log('  Has Password:', !!farmer1.password);
      console.log('  Password Hash Length:', farmer1.password ? farmer1.password.length : 0);
    }
    
    console.log('\nFarmer 2 (8765432109):', farmer2 ? 'Found' : 'Not found');
    if (farmer2) {
      console.log('  Name:', farmer2.name);
      console.log('  Email:', farmer2.email);
      console.log('  Is Approved:', farmer2.isApproved);
      console.log('  Request Status:', farmer2.requestStatus);
      console.log('  Has Password:', !!farmer2.password);
      console.log('  Password Hash Length:', farmer2.password ? farmer2.password.length : 0);
    }

    
    if (farmer1) {
      const isValidPassword = await farmer1.matchPassword('farmer123');
      console.log('\nFarmer 1 - Password "farmer123" is valid:', isValidPassword);
    }

    if (farmer2) {
      const isValidPassword = await farmer2.matchPassword('farmer123');
      console.log('Farmer 2 - Password "farmer123" is valid:', isValidPassword);
    }
    
    console.log('\n=== Login Credentials ===');
    console.log('Farmer 1: Phone: 9876543210, Password: farmer123');
    console.log('Farmer 2: Phone: 8765432109, Password: farmer123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkDemoFarmers();
