import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Farmer from '../src/models/Farmer.js';
import Crop from '../src/models/Crop.js';


dotenv.config();


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};


const displayFarmerCrops = async (farmerPhoneNumber) => {
  try {
    
    const farmer = await Farmer.findOne({ phoneNumber: farmerPhoneNumber });
    
    if (!farmer) {
      console.log(`\nNo farmer found with phone number ${farmerPhoneNumber}`);
      return;
    }

    console.log(`\n=== Crops for ${farmer.name} (${farmerPhoneNumber}) ===`);
    
    
    const crops = await Crop.find({ farmer: farmer._id });
    
    if (crops.length === 0) {
      console.log('No crops found for this farmer.');
      return;
    }
    
    crops.forEach((crop, index) => {
      console.log(`\nCrop #${index + 1}:`);
      console.log(`  Name: ${crop.name}`);
      console.log(`  Category: ${crop.category}`);
      console.log(`  Quantity Available: ${crop.quantityAvailable} ${crop.unit}`);
      console.log(`  Price: ₹${crop.price} per ${crop.unit}`);
      console.log(`  Description: ${crop.description}`);
      console.log(`  Listed: ${crop.createdAt.toLocaleDateString()}`);
    });
  } catch (error) {
    console.error('Error displaying farmer crops:', error);
  }
};


const addCropForFarmer = async (farmerPhoneNumber, cropData) => {
  try {
    
    const farmer = await Farmer.findOne({ phoneNumber: farmerPhoneNumber });
    
    if (!farmer) {
      console.log(`\nNo farmer found with phone number ${farmerPhoneNumber}`);
      return;
    }
    
    
    const newCrop = new Crop({
      farmer: farmer._id,
      ...cropData
    });
    
    await newCrop.save();
    
    console.log(`\n Added new crop "${cropData.name}" for ${farmer.name}`);
    return newCrop;
  } catch (error) {
    console.error('Error adding crop:', error);
  }
};


const viewFarmerOrders = async (farmerPhoneNumber) => {
  try {
    
    const farmer = await Farmer.findOne({ phoneNumber: farmerPhoneNumber });
    
    if (!farmer) {
      console.log(`\nNo farmer found with phone number ${farmerPhoneNumber}`);
      return;
    }

    console.log(`\n=== Orders for ${farmer.name} (${farmerPhoneNumber}) ===`);
    
    
    const crops = await Crop.find({ farmer: farmer._id });
    
    if (crops.length === 0) {
      console.log('No crops found for this farmer, so no orders.');
      return;
    }
    
    
    console.log('To implement: Fetch orders for this farmer\'s crops');
    
  } catch (error) {
    console.error('Error viewing farmer orders:', error);
  }
};


const runDemo = async () => {
  const conn = await connectDB();
  
  
  await displayFarmerCrops(process.env.DEMO_FARMER1_PHONE);
  await displayFarmerCrops(process.env.DEMO_FARMER2_PHONE);
  
  
  const cropData = {
    name: "Organic Tomatoes",
    category: "Vegetables",
    description: "Fresh organic tomatoes grown without pesticides",
    price: 40,
    quantityAvailable: 100,
    unit: "kg",
    images: ["http://example.com/tomato.jpg"],
    organic: true,
    harvestedAt: new Date()
  };
  
  await addCropForFarmer(process.env.DEMO_FARMER1_PHONE, cropData);
  
  
  await displayFarmerCrops(process.env.DEMO_FARMER1_PHONE);
  
  
  await viewFarmerOrders(process.env.DEMO_FARMER1_PHONE);
  await viewFarmerOrders(process.env.DEMO_FARMER2_PHONE);
  
  await conn.disconnect();
  process.exit(0);
};

runDemo();
