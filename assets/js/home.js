window.onload = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Please login first");
    window.location.href = "user.html";
    return;
  }

  document.getElementById("name").textContent = user.userId;
  document.getElementById("aadhaar").textContent = user.aadhar;
  document.getElementById("mobile").textContent = user.phone;

  document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "user.html";
  };

  document.getElementById("photoInput").onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgPreview = document.createElement("img");
        imgPreview.src = reader.result;
        imgPreview.style.maxWidth = "100%";
        imgPreview.style.marginTop = "10px";
        document.getElementById("photoList").appendChild(imgPreview);
      };
      reader.readAsDataURL(file);
    }
  };
};

function uploadPhoto() {
  const caption = document.getElementById("caption").value.trim();
  if (!caption) {
    document.getElementById("waitMsg").textContent = "Please enter a caption before uploading.";
    return;
  }
  document.getElementById("waitMsg").textContent = "Photo uploaded (preview only)";
}
