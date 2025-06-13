window.onload=()=>{const user=JSON.parse(localStorage.getItem("currentUser"));
if(!user)return window.location="user.html";
document.getElementById("name").textContent=user.userId;
document.getElementById("aadhaar").textContent=user.aadhar;
document.getElementById("mobile").textContent=user.phone;
document.getElementById("logoutBtn").onclick=()=>{localStorage.removeItem("currentUser");window.location="user.html";};
loadPhotos();};
function uploadPhoto(){
const file=document.getElementById("photoInput").files[0];
const caption=document.getElementById("caption").value.trim();
const wait=document.getElementById("waitMsg");
if(!file||!caption){wait.textContent="Image and caption required.";return;}
const reader=new FileReader();
reader.onload=()=>{
const photos=JSON.parse(localStorage.getItem("userPhotos"))||[];
photos.push({image:reader.result,caption});
localStorage.setItem("userPhotos",JSON.stringify(photos));
wait.textContent="Photo uploaded!";
loadPhotos();};reader.readAsDataURL(file);}
function loadPhotos(){
const photoList=document.getElementById("photoList");
const photos=JSON.parse(localStorage.getItem("userPhotos"))||[];
photoList.innerHTML=photos.map(p=>`<div><img src="${p.image}" style="max-width:200px;"><p>${p.caption}</p></div>`).join("");}