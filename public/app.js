// public/app.js
document.addEventListener("DOMContentLoaded", async () => {
    const productsContainer = document.querySelector(".products");
    updateCartCount();
  
    try {
      const res = await fetch("/api/products");
      const products = await res.json();
  
      if (products.length === 0) {
        productsContainer.innerHTML = "<p>No products available.</p>";
        return;
      }
  
      // Render products WITHOUT inline onclick
      productsContainer.innerHTML = products.map(p => `
        <div class="product-card">
          <img src="${p.image || 'https://via.placeholder.com/200x150?text=No+Image'}" alt="${p.title}" />
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <p class="price">$${p.price.toFixed(2)}</p>
          <button class="btn add-btn"
                  data-id="${p._id}"
                  data-title="${p.title}"
                  data-price="${p.price}">
            Add to Cart
          </button>
        </div>
      `).join("");
  
      // ✅ Add click event listeners (CSP-safe)
      document.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const title = btn.dataset.title;
          const price = parseFloat(btn.dataset.price);
          addToCart(id, title, price);
        });
      });
  
    } catch (err) {
      console.error("Error fetching products:", err);
      productsContainer.innerHTML = "<p>Failed to load products.</p>";
    }
  });
  
  // 🛒 Add product to cart
  function addToCart(id, title, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, title, price, qty: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${title} added to cart!`);
  }
  
  // 🧾 Update cart count display
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    const el = document.querySelector("#cart-count");
    if (el) el.textContent = `(${count})`;
  }

  // logout handler
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("Logged out successfully!");
      window.location.href = "login.html";
    });
  }
});

  