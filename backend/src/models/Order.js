import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity cannot be less than 1']
  },
  price: {
    type: Number,
    required: true
  },
  
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'UPI', 'Card', 'NetBanking'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  orderStatus: {
    type: String,
    enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Placed'
  },
  estimatedDelivery: {
    type: Date
  },
  actualDelivery: {
    type: Date
  },
  cancellationReason: {
    type: String
  },
  refundStatus: {
    type: String,
    enum: ['None', 'Processing', 'Completed'],
    default: 'None'
  }
}, {
  timestamps: true
});


orderSchema.statics.findByFarmer = async function(farmerId) {
  return this.find({ 'items.farmer': farmerId })
    .populate('customer', 'name phoneNumber')
    .populate('items.crop', 'name category price');
};


orderSchema.virtual('daysSinceOrder').get(function() {
  const now = new Date();
  const orderDate = new Date(this.createdAt);
  const diffTime = Math.abs(now - orderDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
