function addUser() {
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    const role = document.getElementById('newRole').value.trim();
    const createdBy = 'admin'; // hardcoded for now

    // Clear previous messages
    const msgDiv = document.getElementById("addMsg");
    msgDiv.innerText = "";

    // Basic validation
    if (!username || !password || !role) {
        msgDiv.innerText = "All fields are required.";
        return;
    }

    fetch(`http://localhost:8080/api/users?createdBy=${createdBy}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("HTTP error! status: " + res.status);
        }
        return res.json();
    })
    .then(data => {
        if (data.status === "success") {
            msgDiv.style.color = "green";
        } else {
            msgDiv.style.color = "red";
        }
        msgDiv.innerText = data.message;
    })
    .catch(err => {
        console.error("Add user error:", err);
        msgDiv.style.color = "red";
        msgDiv.innerText = "Failed to add user.";
    });
}
