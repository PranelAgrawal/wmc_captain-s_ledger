window.onload = function () {
    fetch("http://localhost:8080/api/check-session", {
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
        if (data.status !== "logged_in" || data.role !== "ADMIN") {
            alert("You are not authorized. Redirecting to login.");
            window.location.href = "login.html";
        }
    });
};


function addUser() {
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    const role = document.getElementById('newRole').value.trim();
    const createdBy = 'admin';

    const msgDiv = document.getElementById("addMsg");
    msgDiv.innerText = "";
    msgDiv.style.color = "red";

    // Frontend validations
    if (username.length < 3) {
        msgDiv.innerText = "Username must be at least 3 characters.";
        return;
    }

    if (password.length < 6) {
        msgDiv.innerText = "Password must be at least 6 characters.";
        return;
    }

    // Weak password detection (basic check)
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!strongPasswordPattern.test(password)) {
        msgDiv.innerText = "Password is weak. It must contain uppercase, lowercase, digit, and special character.";
        return;
    }

    if (role !== "USER" && role !== "ADMIN") {
        msgDiv.innerText = "Role must be USER or ADMIN.";
        return;
    }

    // All validations passed → send to backend
    fetch(`http://localhost:8080/api/users?createdBy=${createdBy}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
    })
    .then(res => {
        if (!res.ok) throw new Error("HTTP error! status: " + res.status);
        return res.json();
    })
    .then(data => {
        msgDiv.style.color = data.status === "success" ? "green" : "red";
        msgDiv.innerText = data.message;
    })
    .catch(err => {
        console.error("Add user error:", err);
        msgDiv.innerText = "Failed to add user.";
    });
}
