// controllers/cartController.js

// ✅ Placeholder for now (no DB connection needed yet)
const getCart = (req, res) => {
    res.json({ message: "🛒 Fetch cart - working" });
  };
  
  const addToCart = (req, res) => {
    const { productId, qty } = req.body;
    res.json({ message: "✅ Added to cart", productId, qty });
  };
  
  const removeFromCart = (req, res) => {
    const { productId } = req.params;
    res.json({ message: "❌ Removed from cart", productId });
  };
  
  module.exports = { getCart, addToCart, removeFromCart };
  