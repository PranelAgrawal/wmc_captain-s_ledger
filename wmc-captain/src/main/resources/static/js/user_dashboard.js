document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.getItem("username");
  if (!username) return;

  fetch(`/api/profile?username=${username}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("name").value = data.name || "";
      document.getElementById("email").value = data.email || "";
      document.getElementById("description").value = data.description || "";
      document.getElementById("avatarUrl").value = data.avatarUrl || "";
      document.getElementById("currentMission").value = data.currentMission || "None";
      document.getElementById("activeMission").value = data.activeMission ? "Yes" : "No";
    });

  document.getElementById("profileForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedData = {
      username: username,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      description: document.getElementById("description").value,
      avatarUrl: document.getElementById("avatarUrl").value
    };

    fetch("/api/profile/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    })
    .then(res => res.json())
    .then(response => {
      const msgBox = document.getElementById("saveMessage");
      msgBox.textContent = response.message || "Profile updated!";
      msgBox.className = "admin-msg success";
    })
    .catch(err => {
      console.error(err);
      const msgBox = document.getElementById("saveMessage");
      msgBox.textContent = "Update failed.";
      msgBox.className = "admin-msg error";
    });
  });
});
