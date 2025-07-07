document.getElementById("addAvengerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const resultBox = document.getElementById("resultBox");
    const submitBtn = document.getElementById("submitBtn");

    submitBtn.disabled = true;
    submitBtn.textContent = "Adding...";

    fetch("http://localhost:8080/api/admin/addAvenger", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.text())
    .then(msg => {
        resultBox.style.display = "block";
        if (msg.toLowerCase().includes("success")) {
            resultBox.className = "admin-msg success";
            resultBox.innerText = "✅ Avenger added successfully!";
            document.getElementById("addAvengerForm").reset();
        } else {
            resultBox.className = "admin-msg error";
            resultBox.innerText = "❌ Failed to add Avenger.";
        }
    })
    .catch(err => {
        resultBox.style.display = "block";
        resultBox.className = "admin-msg error";
        resultBox.innerText = "⚠️ Server error. Try again.";
        console.error(err);
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Add Avenger";
    });
});
