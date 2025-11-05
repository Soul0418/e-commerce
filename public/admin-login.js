document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Login failed");
      return;
    }

    // Save auth info
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ Redirect based on role
    if (data.user.role === "ADMIN") {
      alert("Welcome Admin!");
      window.location.href = "admin.html";
    } else {
      alert("Welcome back!");
      window.location.href = "index.html";
    }

  } catch (err) {
    console.error("Login error:", err);
    alert("Error logging in. Please try again.");
  }
});
