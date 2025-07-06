function toggleProfile() {
  const card = document.getElementById("profileCard");
  card.style.display = (card.style.display === "none") ? "block" : "none";
}

window.onload = function () {
  fetch("http://localhost:8080/api/me", {
    credentials: "include"
  })
  .then(res => res.json())
  .then(user => {
    document.getElementById("fullName").value = user.fullName || "";
    document.getElementById("email").value = user.email || "";
    document.getElementById("phone").value = user.phoneNumber || "";
    document.getElementById("username").value = user.username;
    document.getElementById("role").value = user.role;
    document.getElementById("missions").value = user.missionsDone || 0;
    document.getElementById("avatarUrl").value = user.avatarUrl || "";
    document.getElementById("avatar").src = user.avatarUrl || "default-avatar.png";
  });
};

document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const data = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phoneNumber: document.getElementById("phone").value,
    avatarUrl: document.getElementById("avatarUrl").value
  };

  fetch("http://localhost:8080/api/update-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  })
  .then(res => res.json())
  .then(result => {
    alert(result.message);
    if (data.avatarUrl) {
      document.getElementById("avatar").src = data.avatarUrl;
    }
  });
});