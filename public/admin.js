// public/admin.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addProductForm");
    const messageEl = document.getElementById("message");
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first!");
      window.location.href = "admin-login.html";
      return;
    }
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const title = document.getElementById("title").value.trim();
      const description = document.getElementById("description").value.trim();
      const price = parseFloat(document.getElementById("price").value);
      const image = document.getElementById("image").value.trim();
  
      if (!title || isNaN(price)) {
        messageEl.textContent = "Please enter valid title and price.";
        return;
      }
  
      try {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ title, description, price, image }),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          messageEl.style.color = "green";
          messageEl.textContent = `✅ ${data.message}`;
          form.reset();
        } else {
          messageEl.style.color = "red";
          messageEl.textContent = `❌ ${data.error || data.message}`;
        }
      } catch (err) {
        messageEl.style.color = "red";
        messageEl.textContent = "Failed to connect to server.";
        console.error(err);
      }
    });
  });
  