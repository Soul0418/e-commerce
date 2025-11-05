document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.error("Error:", data);
        alert(data.error || data.errors?.[0]?.msg || "Registration failed");
        return;
      }
  
      alert("Registration successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      window.location.href = "index.html";
    } catch (err) {
      console.error("Register error:", err);
      alert("Server error. Please try again later.");
    }
  });
  