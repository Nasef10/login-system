// Array to store users
const users = JSON.parse(localStorage.getItem("users")) || [];

// Register ()
function register() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!name || !email || !password) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'All fields are required!',
    });
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Enter a valid email address!',
    });
    return;
  }

  if (users.some((user) => user.email === email)) {
    Swal.fire({
      icon: 'warning',
      title: 'Email Exists',
      text: 'This email is already registered!',
    });
    return;
  }

  // Add user to array
  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  Swal.fire({
    icon: 'success',
    title: 'Registered!',
    text: 'Redirecting to Login...',
    timer: 2000,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = "index.html";
  });
}

// Login Function
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Invalid email or password!',
    });
    return;
  }

  // Save current user to localStorage
  localStorage.setItem("currentUser", JSON.stringify(user));
  Swal.fire({
    icon: 'success',
    title: 'Login Successful!',
    text: 'Redirecting to Home page...',
    timer: 2000,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = "home.html";
  });
}

// Logout Function
function logout() {
  Swal.fire({
    icon: 'question',
    title: 'Are you sure?',
    text: 'You will be logged out.',
    showCancelButton: true,
    confirmButtonText: 'Yes, Logout',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("currentUser");
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been logged out successfully.',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "index.html";
      });
    }
  });
}

// Protect Home Page
if (window.location.pathname.includes("home.html")) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "index.html";
  } else {
    document.getElementById("userName").textContent = currentUser.name;
  }
}
