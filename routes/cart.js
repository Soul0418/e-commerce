// routes/cart.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const { authMiddleware } = require('../middleware/authMiddleware');

// get user's cart
router.get('/', authMiddleware, async (req, res) => {
  const items = await CartItem.find({ user: req.user._id }).populate('product');
  const mapped = items.map(i => ({
    id: i.product._id,
    title: i.product.title,
    price: i.product.price,
    image: i.product.image,
    qty: i.qty
  }));
  const subtotal = mapped.reduce((s, it) => s + it.price * it.qty, 0);
  res.json({ items: mapped, subtotal });
});

// add to cart / upsert
router.post('/', authMiddleware,
  body('productId').notEmpty(), body('qty').isInt({ gt: 0 }),
  async (req, res) => {
    const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { productId, qty } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const item = await CartItem.findOneAndUpdate(
      { user: req.user._id, product: productId },
      { $inc: { qty: Number(qty) } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json({ success: true, item });
});

// update qty
router.put('/', authMiddleware,
  body('productId').notEmpty(), body('qty').isInt({ min: 0 }),
  async (req,res) => {
    const { productId, qty } = req.body;
    if (qty <= 0) {
      await CartItem.deleteOne({ user: req.user._id, product: productId });
      return res.json({ success: true });
    }
    const item = await CartItem.findOneAndUpdate({ user: req.user._id, product: productId }, { qty }, { new: true });
    res.json({ success: true, item });
});

// remove
router.delete('/:productId', authMiddleware, async (req, res) => {
  await CartItem.deleteOne({ user: req.user._id, product: req.params.productId });
  res.json({ success: true });
});

module.exports = router;
