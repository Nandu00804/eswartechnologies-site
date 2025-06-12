document.getElementById("userForm").addEventListener("submit",function(e){
e.preventDefault();const a=document.getElementById("aadhar").value.trim();
const p=document.getElementById("phone").value.trim();const u=document.getElementById("userId").value.trim();
const pw=document.getElementById("password").value.trim();const m=document.getElementById("message");
const users=JSON.parse(localStorage.getItem("users"))||[];if(users.some(x=>x.userId===u)){m.textContent="Exists!";return;}
users.push({aadhar:a,phone:p,userId:u,password:pw});localStorage.setItem("users",JSON.stringify(users));
m.textContent="Created!";renderUserList();});function renderUserList(){
const users=JSON.parse(localStorage.getItem("users"))||[];document.getElementById("userList").innerHTML=
users.map(u=>`<p>${u.userId} - ${u.phone}</p>`).join("");}
document.getElementById("adminLogoutBtn").onclick=()=>window.location="user.html";renderUserList();