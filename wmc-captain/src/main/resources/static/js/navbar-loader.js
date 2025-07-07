document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    });
});

// Provide logout function globally
function logout() {
  sessionStorage.clear();
}
