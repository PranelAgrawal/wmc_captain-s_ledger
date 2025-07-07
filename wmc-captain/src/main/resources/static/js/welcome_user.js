window.onload = function () {
    const username = sessionStorage.getItem("username");
    const role = sessionStorage.getItem("role");

    if (!username || !role) {
        alert("Please login first.");
        window.location.href = "/html/login.html";
        return;
    }

    if (role !== "USER") {
        alert("Access denied. Only users can access this page.");
        window.location.href = "/html/login.html";
        return;
    }

    document.getElementById("welcomeMessage").innerText =
        `Hello ${username}, welcome to the Captain's Ledger.`;
};
