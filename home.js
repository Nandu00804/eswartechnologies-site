window.onload=()=>{const u=JSON.parse(localStorage.getItem("currentUser"));
if(!u)return window.location="user.html";document.getElementById("name").textContent=u.userId;
document.getElementById("aadhaar").textContent=u.aadhar;document.getElementById("mobile").textContent=u.phone;
document.getElementById("logoutBtn").onclick=()=>{localStorage.removeItem("currentUser");window.location="user.html";};
document.getElementById("photoInput").onchange=e=>{const f=e.target.files[0];if(f){
const r=new FileReader();r.onload=()=>{const i=document.createElement("img");i.src=r.result;
document.getElementById("photoList").innerHTML="";document.getElementById("photoList").appendChild(i);};
r.readAsDataURL(f);}}};function uploadPhoto(){
const caption=document.getElementById("caption").value.trim();
if(!caption){document.getElementById("waitMsg").textContent="Enter caption.";return;}
document.getElementById("waitMsg").textContent="Uploaded (preview only)";}