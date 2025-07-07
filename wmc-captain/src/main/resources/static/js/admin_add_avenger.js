document.getElementById("addAvengerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    fetch("http://localhost:8080/api/admin/addAvenger", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.text())
    .then(msg => {
        document.getElementById("result").innerText = msg;
        document.getElementById("addAvengerForm").reset();
    })
    .catch(err => {
        document.getElementById("result").innerText = "Failed to add Avenger.";
        console.error(err);
    });
});
