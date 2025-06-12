const users=JSON.parse(localStorage.getItem("users"))||[];
function login(){
const id=document.getElementById("userId").value.trim();
const pw=document.getElementById("password").value.trim();
const user=users.find(u=>u.userId===id&&u.password===pw);
if(user){
localStorage.setItem("currentUser",JSON.stringify(user));
window.location.assign("https://nandu00804.github.io/eswartechnologies-site/home.html");
}else{
document.getElementById("error").textContent="Invalid credentials!";}}