function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.getElementById('toggleIcon');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
  }
}

document.getElementById('login-form').addEventListener('submit', function(e) {
  showOtpModal(); // Send OTP
});

function showOtpModal() {
  document.getElementById('otpModal').style.display = 'block';
}

function closeOtpModal() {
  document.getElementById('otpModal').style.display = 'none';
}

function resendOtp() {
  alert('OTP resent to your email');
}

// OTP verify for login
document.getElementById('verify-btn').addEventListener('click', function() {
  const otp = document.getElementById('otp-input').value;
  if (otp === '123456') { // Simulate
    closeOtpModal();
    // Store role (for demo, assume faculty)
    localStorage.setItem('userRole', 'faculty'); // Change as needed
    alert('Login successful!');
    // Redirect to dashboard
    window.location.href = 'index.html'; // or classSched.html
  } else {
    alert('Invalid OTP');
  }
});

// Forgot password
function showForgotModal() {
  document.getElementById('forgotModal').style.display = 'block';
}

function closeForgotModal() {
  document.getElementById('forgotModal').style.display = 'none';
}

document.getElementById('reset-btn').addEventListener('click', function() {
  const email = document.getElementById('forgot-email').value;
  if (email) {
    closeForgotModal();
    showResetOtpModal();
    // Simulate send reset OTP
  } else {
    alert('Enter email');
  }
});

function showResetOtpModal() {
  document.getElementById('resetOtpModal').style.display = 'block';
}

function closeResetOtpModal() {
  document.getElementById('resetOtpModal').style.display = 'none';
}

document.getElementById('reset-verify-btn').addEventListener('click', function() {
  const otp = document.getElementById('reset-otp').value;
  const newPass = document.getElementById('new-password').value;
  if (otp === '123456' && newPass) {
    closeResetOtpModal();
    alert('Password reset successful! Please log in.');
  } else {
    alert('Invalid OTP or missing new password');
  }
});
