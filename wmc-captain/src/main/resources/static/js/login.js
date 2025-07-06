function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            if (data.role === "ADMIN") {
                window.location.href = "add-user.html";
            } else {
                window.location.href = "welcome.html";
            }
        } else {
            document.getElementById("message").innerText = data.message;
        }
    });
}
