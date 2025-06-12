document.getElementById("userForm").addEventListener("submit", function (e) {
e.preventDefault();
const aadhar=document.getElementById("aadhar").value.trim();
const phone=document.getElementById("phone").value.trim();
const userId=document.getElementById("userId").value.trim();
const password=document.getElementById("password").value.trim();
const message=document.getElementById("message");
if (!/^\d{12}$/.test(aadhar)) {message.textContent="Invalid Aadhaar!";return;}
if (!/^\d{10}$/.test(phone)) {message.textContent="Invalid Phone!";return;}
const users=JSON.parse(localStorage.getItem("users"))||[];
if(users.some(u=>u.userId===userId)){message.textContent="User exists!";return;}
users.push({aadhar,phone,userId,password});
localStorage.setItem("users",JSON.stringify(users));
message.textContent="User created!";
renderUserList();});
function renderUserList(){
const users=JSON.parse(localStorage.getItem("users"))||[];
const list=document.getElementById("userList");
list.innerHTML="<h3>Registered Users</h3>"+users.map(u=>`<p>${u.userId} - ${u.phone}</p>`).join("");}
renderUserList();