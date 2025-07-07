document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            // Save username and role (optional)
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("role", data.role);

            if (data.role === "ADMIN") {
                sessionStorage.setItem("username", data.username);
                sessionStorage.setItem("role", data.role);
                window.location.href = "admin-dashboard.html";
            }
            else {
                window.location.href = "welcome.html";
            }
        } else {
            document.getElementById("error").innerText = "Invalid username or password.";
        }
    })
    .catch(err => {
        console.error("Login error:", err);
        document.getElementById("error").innerText = "Server error. Try again.";
    });
});
