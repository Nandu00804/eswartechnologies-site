document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const aadhar = document.getElementById("aadhar").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const userId = document.getElementById("userId").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!/^\d{12}$/.test(aadhar)) {
    message.textContent = "Invalid Aadhaar!";
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    message.textContent = "Invalid Phone!";
    return;
  }

  if (!userId || !password) {
    message.textContent = "User ID and Password required!";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.some(u => u.userId === userId);
  if (exists) {
    message.textContent = "User ID already exists!";
    return;
  }

  users.push({ aadhar, phone, userId, password });
  localStorage.setItem("users", JSON.stringify(users));
  message.textContent = "User created successfully!";
  renderUserList();
});

function renderUserList() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const list = document.getElementById("userList");
  list.innerHTML = "<h3>Registered Users</h3>" + users.map(u => `<p>${u.userId} - ${u.phone}</p>`).join("");
}

renderUserList();