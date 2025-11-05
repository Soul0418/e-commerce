// routes/orders.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');
const CartItem = require('../models/CartItem');
const Order = require('../models/Order');
const Product = require('../models/Product');

// create order from user's cart
router.post('/', authMiddleware,
  body('customerName').notEmpty(), body('address').notEmpty(), body('paymentMethod').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const items = await CartItem.find({ user: req.user._id }).populate('product');
    if (!items.length) return res.status(400).json({ error: 'Cart empty' });

    const orderItems = items.map(i => ({
      productId: i.product._id.toString(),
      title: i.product.title,
      price: i.product.price,
      qty: i.qty
    }));
    const subtotal = orderItems.reduce((s, it) => s + it.price * it.qty, 0);

    const order = await Order.create({
      user: req.user._id,
      customerName: req.body.customerName,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
      items: orderItems,
      subtotal
    });

    // clear cart
    await CartItem.deleteMany({ user: req.user._id });

    res.json({ success: true, order });
});

// admin: list orders
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  const orders = await Order.find().populate('user').sort({ createdAt: -1 });
  res.json(orders);
});

// admin: update order status
router.put('/:id/status', authMiddleware, adminOnly, async (req,res) => {
  const { status } = req.body;
  const allowed = ['PENDING','PAID','SHIPPED','CANCELLED'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const o = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(o);
});

module.exports = router;
