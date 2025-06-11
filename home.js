const user = JSON.parse(localStorage.getItem("currentUser"));
const lastUpload = JSON.parse(localStorage.getItem("lastUploadTime"));
const uploads = JSON.parse(localStorage.getItem("uploads")) || [];

// Show user profile
document.getElementById("name").textContent = user.name;
document.getElementById("aadhaar").textContent = user.aadhaar;
document.getElementById("mobile").textContent = user.mobile;

const uploadBtn = document.getElementById("uploadBtn");
const waitMsg = document.getElementById("waitMsg");

// Check 22 hour rule
if (lastUpload) {
  const lastTime = new Date(lastUpload);
  const now = new Date();
  const diffHours = (now - lastTime) / (1000 * 60 * 60);

  if (diffHours < 22) {
    uploadBtn.disabled = true;
    waitMsg.textContent = `You can upload next photo after ${Math.ceil(22 - diffHours)} hours.`;
  }
}

function uploadPhoto() {
  const file = document.getElementById("photoInput").files[0];
  const caption = document.getElementById("caption").value;

  if (!file) {
    alert("Please select a photo.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const photoData = {
      src: e.target.result,
      caption,
      time: new Date().toLocaleString()
    };

    uploads.push(photoData);
    localStorage.setItem("uploads", JSON.stringify(uploads));
    localStorage.setItem("lastUploadTime", JSON.stringify(new Date()));

    displayPhotos();
    uploadBtn.disabled = true;
    waitMsg.textContent = "Photo uploaded! You can upload again after 22 hours.";
  };

  reader.readAsDataURL(file);
}

function displayPhotos() {
  const container = document.getElementById("photoList");
  container.innerHTML = "";

  uploads.forEach(photo => {
    const div = document.createElement("div");
    div.className = "photo-card";
    div.innerHTML = `
      <img src="${photo.src}" />
      <p>${photo.caption}</p>
      <small>Uploaded at: ${photo.time}</small>
    `;
    container.appendChild(div);
  });
}

// On load
displayPhotos();
