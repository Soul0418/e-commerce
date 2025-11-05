// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');

async function main(){
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to mongo');

  const adminEmail = 'admin@shop.test';
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const hash = await bcrypt.hash('123', 10);
    admin = await User.create({ name: 'Admin', email: adminEmail, passwordHash: hash, role: 'ADMIN' });
    console.log('Created admin:', adminEmail);
  }

  const products = [
    { title: 'Minimalist Watch', price: 89.99, description: 'Slim stainless steel watch', image: 'https://via.placeholder.com/400x300?text=Watch', sku: 'WATCH-001', stock: 50 },
    { title: 'Wireless Headphones', price: 129.99, description: 'Over-ear Bluetooth headphones', image: 'https://via.placeholder.com/400x300?text=Headphones', sku: 'HP-002', stock: 70 },
    { title: 'Sneakers Classic', price: 69.99, description: 'Comfortable everyday sneakers', image: 'https://via.placeholder.com/400x300?text=Sneakers', sku: 'SNK-003', stock: 100 }
  ];

  for (const p of products) {
    const exists = await Product.findOne({ sku: p.sku });
    if (!exists) {
      await Product.create(p);
      console.log('Seed product', p.title);
    }
  }

  mongoose.disconnect();
  console.log('Seed finished');
}
main().catch(err => { console.error(err); process.exit(1); });
