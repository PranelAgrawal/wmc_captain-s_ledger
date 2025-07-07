document.addEventListener("DOMContentLoaded", function () {
  const username = sessionStorage.getItem("username");

  fetch(`/api/profile?username=${username}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("name").value = data.name;
      document.getElementById("email").value = data.email;
      document.getElementById("description").value = data.description;
      document.getElementById("currentMission").value = data.currentMission;
    });

  document.getElementById("profileForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      description: document.getElementById("description").value.trim(),
    };

    fetch(`/api/profile?username=${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.text())
      .then(msg => {
        const resultBox = document.getElementById("resultMsg");
        resultBox.className = "admin-msg success";
        resultBox.innerText = "Profile updated!";
      })
      .catch(err => {
        const resultBox = document.getElementById("resultMsg");
        resultBox.className = "admin-msg error";
        resultBox.innerText = "Error updating profile.";
      });
  });
});
