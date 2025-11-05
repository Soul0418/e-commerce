// public/cart.js

document.addEventListener("DOMContentLoaded", () => {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");
    const cartCountEl = document.getElementById("cart-count");
    const checkoutBtn = document.getElementById("checkout-btn");
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    function renderCart() {
      if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        totalEl.textContent = "";
        return;
      }
  
      cartItemsDiv.innerHTML = cart.map(item => `
        <div class="product-card">
          <h4>${item.title}</h4>
          <p>Price: $${item.price}</p>
          <p>Qty: ${item.qty}</p>
          <button class="btn remove-btn" data-id="${item.id}">Remove</button>
        </div>
      `).join("");
  
      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      totalEl.textContent = "Total: $" + total.toFixed(2);
      updateCartCount();
  
      // ✅ Add event listeners safely
      document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          removeFromCart(id);
        });
      });
    }
  
    function removeFromCart(id) {
      cart = cart.filter(i => i.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  
    function updateCartCount() {
      const count = cart.reduce((a, i) => a + i.qty, 0);
      cartCountEl.textContent = `(${count})`;
    }
  
    checkoutBtn.addEventListener("click", () => {
      alert("Checkout successful!");
      localStorage.removeItem("cart");
      cart = [];
      renderCart();
    });
  
    renderCart();
  });
  