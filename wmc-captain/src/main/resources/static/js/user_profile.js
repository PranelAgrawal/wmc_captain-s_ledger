document.addEventListener("DOMContentLoaded", function() {
    // Get username from session (or from Thymeleaf model in real implementation)
    const username = sessionStorage.getItem("username") ||
                    document.getElementById("username").value;

    if (!username) {
         window.location.href = "/login"; // Redirect if not logged in
         return;
    }

    // Fetch profile data
    fetch(`/api/profile?username=${username}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch profile");
            return res.json();
        })
        .then(data => {
            // Map data to form fields
            document.getElementById("fullName").value = data.fullName || "";
            document.getElementById("email").value = data.email || "";
            document.getElementById("avengerAlias").value = data.avengerAlias || "";

            // Add additional fields if needed
            if (data.profileImageUrl) {
                document.getElementById("profileImagePreview").src = data.profileImageUrl;
            }
        })
        .catch(err => {
            document.getElementById("error").textContent = err.message;
        });

    // Handle form submission
    document.getElementById("profileForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const payload = {
            fullName: document.getElementById("fullName").value.trim(),
            email: document.getElementById("email").value.trim(),
            avengerAlias: document.getElementById("avengerAlias").value.trim()
        };

        fetch(`/api/profile/update?username=${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector("meta[name='_csrf']").content
            },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (!res.ok) throw new Error("Update failed");
            return res.json();
        })
        .then(data => {
            const messageBox = document.getElementById("message");
            messageBox.textContent = "Profile updated successfully!";
            messageBox.className = "success";

            // Update session data if needed
            sessionStorage.setItem("avengerAlias", data.avengerAlias);
        })
        .catch(err => {
            const messageBox = document.getElementById("error");
            messageBox.textContent = err.message;
            messageBox.className = "error";
        });
    });

    // Image upload preview (if you add this feature later)
    const imageUpload = document.getElementById("profileImageUpload");
    if (imageUpload) {
        imageUpload.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    document.getElementById("profileImagePreview").src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});