import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: [true, 'Farmer ID is required']
  },
  name: {
    type: String,
    required: [true, 'Crop name is required'],
    trim: true,
    maxlength: [100, 'Crop name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Dairy', 'Herbs', 'Other'],
    default: 'Other'
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  quantityAvailable: {
    type: Number,
    required: [true, 'Quantity available is required'],
    min: [0, 'Quantity cannot be negative']
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    enum: ['kg', 'g', 'ton', 'piece', 'dozen', 'liter', 'ml']
  },
  images: [{
    type: String,
    trim: true
  }],
  organic: {
    type: Boolean,
    default: false
  },
  harvestedAt: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});


cropSchema.methods.isFresh = function() {
  const now = new Date();
  const harvestDate = new Date(this.harvestedAt);
  const diffTime = Math.abs(now - harvestDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};


cropSchema.virtual('url').get(function() {
  return `/crop/${this._id}`;
});

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;
