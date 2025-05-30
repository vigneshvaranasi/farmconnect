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


const createDemoCrops = async () => {
  try {
    const conn = await connectDB();
    
   
    const cropCount = await Crop.countDocuments();
    if (cropCount > 0) {
      console.log(`\nFound ${cropCount} existing crops. Skipping demo crop creation.`);
      console.log('To recreate demo crops, please clear the existing crops first.');
      return;
    }
    
   
    const farmer1 = await Farmer.findOne({ phoneNumber: process.env.DEMO_FARMER1_PHONE });
    const farmer2 = await Farmer.findOne({ phoneNumber: process.env.DEMO_FARMER2_PHONE });
    
    if (!farmer1 || !farmer2) {
      console.log('Demo farmers not found. Please run the create-demo-farmers script first.');
      process.exit(1);
    }
    
    console.log(`\nCreating demo crops for farmers:`);
    console.log(`1. ${farmer1.name} (${farmer1.phoneNumber})`);
    console.log(`2. ${farmer2.name} (${farmer2.phoneNumber})`);
    
    
    const farmer1Crops = [
      {
        farmer: farmer1._id,
        name: "Organic Tomatoes",
        category: "Vegetables",
        description: "Fresh organic tomatoes grown without pesticides. Rich in lycopene and vitamins.",
        price: 40,
        quantityAvailable: 100,
        unit: "kg",
        images: ["https://example.com/images/tomatoes.jpg"],
        organic: true,
        harvestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) 
      },
      {
        farmer: farmer1._id,
        name: "Premium Rice",
        category: "Grains",
        description: "High-quality basmati rice grown in fertile soil. Perfect for biryanis and pulao.",
        price: 80,
        quantityAvailable: 200,
        unit: "kg",
        images: ["https://example.com/images/rice.jpg"],
        organic: false,
        harvestedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
      },
      {
        farmer: farmer1._id,
        name: "Fresh Green Peas",
        category: "Vegetables",
        description: "Sweet and tender green peas, perfect for curries and pulao.",
        price: 60,
        quantityAvailable: 50,
        unit: "kg",
        images: ["https://example.com/images/peas.jpg"],
        organic: true,
        harvestedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) 
      }
    ];
    
    
    const farmer2Crops = [
      {
        farmer: farmer2._id,
        name: "Alphonso Mangoes",
        category: "Fruits",
        description: "Premium Alphonso mangoes from Ratnagiri. Known for their sweetness and aroma.",
        price: 400,
        quantityAvailable: 50,
        unit: "dozen",
        images: ["https://example.com/images/mangoes.jpg"],
        organic: true,
        harvestedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) 
      },
      {
        farmer: farmer2._id,
        name: "Organic Wheat",
        category: "Grains",
        description: "Stone-ground organic wheat, perfect for making rotis and bread.",
        price: 60,
        quantityAvailable: 300,
        unit: "kg",
        images: ["https://example.com/images/wheat.jpg"],
        organic: true,
        harvestedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) 
      },
      {
        farmer: farmer2._id,
        name: "Fresh Coconuts",
        category: "Fruits",
        description: "Young green coconuts with sweet water and soft pulp.",
        price: 30,
        quantityAvailable: 100,
        unit: "piece",
        images: ["https://example.com/images/coconuts.jpg"],
        organic: false,
        harvestedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) 
      }
    ];
    
   
    await Crop.insertMany([...farmer1Crops, ...farmer2Crops]);
    
    console.log(`\n Successfully added ${farmer1Crops.length} crops for ${farmer1.name}`);
    console.log(`Successfully added ${farmer2Crops.length} crops for ${farmer2.name}`);
    
    console.log('\nDemo crops created successfully!');
    
    await conn.disconnect();
  } catch (error) {
    console.error('Error creating demo crops:', error);
    process.exit(1);
  }
};

createDemoCrops();
