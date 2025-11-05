// models/Order.js
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: String,
  title: String,
  price: Number,
  qty: Number
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: String,
  address: String,
  paymentMethod: String,
  items: [ OrderItemSchema ],
  subtotal: Number,
  status: { type: String, enum: ['PENDING','PAID','SHIPPED','CANCELLED'], default: 'PENDING' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
