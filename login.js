function login(){
const id=document.getElementById("userId").value.trim();
const pw=document.getElementById("password").value.trim();
const users=JSON.parse(localStorage.getItem("users"))||[];
const user=users.find(u=>u.userId===id&&u.password===pw);
if(user){localStorage.setItem("currentUser",JSON.stringify(user));window.location="home.html";}
else{document.getElementById("error").textContent="Invalid credentials!";}}