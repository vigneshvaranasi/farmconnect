import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';


dotenv.config();


const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
  },
  aadharNumber: {
    type: String,
    required: [true, 'Aadhar number is required'],
    unique: true,
    match: [/^\d{12}$/, 'Aadhar number must be 12 digits']
  },
  email: {
    type: String,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  bankAccountNumber: {
    type: String,
    required: [true, 'Bank account number is required'],
    match: [/^\d{9,18}$/, 'Please enter a valid bank account number']
  },
  ifscCode: {
    type: String,
    required: [true, 'IFSC code is required'],
    uppercase: true,
    match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Please enter a valid IFSC code']
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters long']
  },
  userType: {
    type: String,
    default: 'farmer',
    immutable: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  requestStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  approvedAt: {
    type: Date
  },
  rejectedAt: {
    type: Date
  },
  rejectionReason: {
    type: String
  }
}, {
  timestamps: true
});


farmerSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Farmer = mongoose.model('Farmer', farmerSchema);


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};


const demoFarmers = [
  {
    name: 'Rajesh Kumar',
    phoneNumber: '9876543210',
    aadharNumber: '123456789012',
    email: 'rajesh.kumar@gmail.com',
    address: 'Village Rampur, District Meerut, Uttar Pradesh, PIN: 250001',
    bankAccountNumber: '1234567890123456',
    ifscCode: 'SBIN0001234',
    password: 'farmer123',
    isApproved: true,
    requestStatus: 'approved',
    approvedAt: new Date()
  },  {
    name: 'Priya Sharma',
    phoneNumber: '8765432109',
    aadharNumber: '234567890123',
    email: 'priya.sharma@gmail.com',
    address: 'Village Khetri, District Jaipur, Rajasthan, PIN: 302001',
    bankAccountNumber: '2345678901234567',
    ifscCode: 'HDFC0002345',
    password: 'farmer123',
    isApproved: true,
    requestStatus: 'approved',
    approvedAt: new Date()
  }
];


const createDemoFarmers = async () => {
  try {
    await connectDB();
    
    console.log('Creating demo farmer credentials...');
    
    
    for (const farmerData of demoFarmers) {
      const existingFarmer = await Farmer.findOne({
        $or: [
          { phoneNumber: farmerData.phoneNumber },
          { aadharNumber: farmerData.aadharNumber },
          { email: farmerData.email }
        ]
      });
      
      if (existingFarmer) {
        console.log(`Farmer with phone ${farmerData.phoneNumber} already exists, skipping...`);
        continue;
      }
      
      
      const farmer = new Farmer(farmerData);
      await farmer.save();
      
      console.log(` Created farmer: ${farmerData.name} (Phone: ${farmerData.phoneNumber})`);
      console.log(`   Login credentials - Phone: ${farmerData.phoneNumber}, Password: ${farmerData.password}`);
    }
    
    console.log('\n🎉 Demo farmer credentials created successfully!');
    console.log('\nDemo Login Credentials:');
    console.log('========================');
    demoFarmers.forEach((farmer, index) => {
      console.log(`\nFarmer ${index + 1}:`);
      console.log(`Name: ${farmer.name}`);
      console.log(`Phone: ${farmer.phoneNumber}`);
      console.log(`Password: ${farmer.password}`);
      console.log(`Email: ${farmer.email}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating demo farmers:', error.message);
    process.exit(1);
  }
};


createDemoFarmers();
