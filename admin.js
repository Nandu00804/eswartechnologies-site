document.getElementById("userForm").addEventListener("submit", function (e) {
e.preventDefault();
const aadhar = document.getElementById("aadhar").value.trim();
const phone = document.getElementById("phone").value.trim();
const userId = document.getElementById("userId").value.trim();
const password = document.getElementById("password").value.trim();
const message = document.getElementById("message");
if (!/^\d{12}$/.test(aadhar)) return message.textContent = "Invalid Aadhaar!";
if (!/^\d{10}$/.test(phone)) return message.textContent = "Invalid Phone!";
const users = JSON.parse(localStorage.getItem("users")) || [];
if (users.some(u => u.userId === userId)) return message.textContent = "User ID already exists!";
users.push({ aadhar, phone, userId, password });
localStorage.setItem("users", JSON.stringify(users));
message.textContent = "User created successfully!";
renderUserList(); });
function renderUserList() {
const users = JSON.parse(localStorage.getItem("users")) || [];
const list = document.getElementById("userList");
list.innerHTML = "<h3>Registered Users</h3>" + users.map(u => `<p>👤 ${u.userId} - 📱 ${u.phone}</p>`).join(""); }
function findUser() {
const id = document.getElementById("findUserId").value.trim();
const users = JSON.parse(localStorage.getItem("users")) || [];
const match = users.find(u => u.userId === id);
document.getElementById("foundUser").textContent = match
? `Aadhaar: ${match.aadhar}, Phone: ${match.phone}` : "User not found!"; }
document.getElementById("logoutAdmin").onclick = () => {
sessionStorage.removeItem("adminAuth");
window.location.href = "user.html"; };
renderUserList();