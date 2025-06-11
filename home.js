window.onload=()=>{
const user=JSON.parse(localStorage.getItem("currentUser"));
if(!user){alert("Please login");window.location.href="user.html";return;}
document.getElementById("name").textContent=user.userId;
document.getElementById("aadhaar").textContent=user.aadhar;
document.getElementById("mobile").textContent=user.phone;
document.getElementById("logoutBtn").onclick=()=>{
localStorage.removeItem("currentUser");window.location.href="user.html";};
document.getElementById("photoInput").onchange=(e)=>{
const file=e.target.files[0];
if(file){const reader=new FileReader();
reader.onload=()=>{
const img=document.createElement("img");
img.src=reader.result;img.style.maxWidth="100%";
document.getElementById("photoList").appendChild(img);};
reader.readAsDataURL(file);}}};
function uploadPhoto(){
const caption=document.getElementById("caption").value.trim();
if(!caption){document.getElementById("waitMsg").textContent="Enter caption";return;}
document.getElementById("waitMsg").textContent="Uploaded (preview only)";}
