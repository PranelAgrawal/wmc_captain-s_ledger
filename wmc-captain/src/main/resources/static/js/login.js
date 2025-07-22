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
            sessionStorage.setItem("username", data.username);
            sessionStorage.setItem("role", data.role);

            // Remove .html extensions for Spring routing
            window.location.href = data.role === "ADMIN"
                ? "/admin/dashboard"
                : "/profile";
        }
    })
    .catch(err => {
        console.error("Login error:", err);
        document.getElementById("error").innerText = "Server error. Try again.";
    });
});
