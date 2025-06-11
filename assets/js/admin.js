const adminLoginForm = document.getElementById('admin-login-form');
const createUserForm = document.getElementById('create-user-form');
const dashboardPage = document.getElementById('dashboard-page');
const loginPage = document.getElementById('login-page');
const userList = document.getElementById('user-list');
const searchButton = document.getElementById('search-button');
const searchResult = document.getElementById('search-result');
const searchIdInput = document.getElementById('search-id');

// Load users from localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Render users in the list
function renderUserList() {
  userList.innerHTML = ''; // Clear current list
  users.forEach(user => {
    const userItem = document.createElement('li');
    userItem.textContent = `ID: ${user.userId}, Aadhaar: ${user.aadhar}, Phone: ${user.phone}`;
    userList.appendChild(userItem);
  });
}

// Initial render
renderUserList();

// Handle admin login
adminLoginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  if (username === 'admin' && password === 'admin123') {
    loginPage.style.display = 'none';
    dashboardPage.style.display = 'block';
  } else {
    alert('Invalid username or password!');
  }
});

// Handle creating a new user
createUserForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const aadhar = document.getElementById('aadhar').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const userId = document.getElementById('user-id').value.trim();
  const password = document.getElementById('password').value.trim(); // Get the password value

  // Aadhaar validation: 12 digits
  if (!/^\d{12}$/.test(aadhar)) {
    alert('Aadhaar number must be exactly 12 digits.');
    return;
  }

  // Phone number validation: 10 digits
  if (!/^\d{10}$/.test(phone)) {
    alert('Phone number must be exactly 10 digits.');
    return;
  }

  // Check for unique user ID
  if (users.some(user => user.userId === userId)) {
    alert('User ID already used!');
    return;
  }

  // Check for unique phone number
  if (users.some(user => user.phone === phone)) {
    alert('Phone number already used!');
    return;
  }

  const user = { aadhar, phone, userId, password }; // Save the password along with user info
  users.push(user);

  // Save users to localStorage
  localStorage.setItem('users', JSON.stringify(users));

  // Render updated user list
  renderUserList();

  alert('User created successfully!');

  // Clear form
  createUserForm.reset();
});

// Handle search by user ID
searchButton.addEventListener('click', () => {
  const searchId = searchIdInput.value.trim();
  const user = users.find(u => u.userId === searchId);

  if (user) {
    searchResult.innerHTML = `
      <p><strong>Aadhaar:</strong> ${user.aadhar}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>User ID:</strong> ${user.userId}</p>
      <p><strong>Password:</strong> ${user.password}</p> <!-- Display the password -->
    `;
  } else {
    searchResult.innerHTML = '<p style="color: red;">User not found!</p>';
  }
});