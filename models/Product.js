// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  sku: { type: String, unique: true, sparse: true },
  stock: { type: Number, default: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
