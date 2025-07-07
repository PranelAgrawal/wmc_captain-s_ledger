document.addEventListener("DOMContentLoaded", () => {
    fetch("user_navbar.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById("navbar-placeholder").innerHTML = html;
        });
});
