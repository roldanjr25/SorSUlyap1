// Password toggle function (used in login, signup)
function togglePassword() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return;
    const toggleIcon = document.getElementById('toggleIcon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

// Form event listeners

// Admin Signup
const adminSignupForm = document.getElementById('admin-signup-form');
if (adminSignupForm) {
    adminSignupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        alert('Admin account created successfully!');
        window.location.href = 'login.html';
    });
}

// Admin Login


// Forgot Password
const forgotForm = document.querySelector('.forgot-container form');
if (forgotForm) {
    forgotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('If an account with that email exists, we have sent you a password reset link.');
    });
}

// Announcement Post Form
const postForm = document.getElementById('postForm');
if (postForm) {
    postForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            // Get form values
            const title = document.getElementById('title').value.trim();
            const content = document.getElementById('content').value.trim();
            const attachmentsInput = document.getElementById('attachments');

            if (!title || !content) {
                alert('Please fill in all required fields (Title and Content)');
                return;
            }

            // Get attached files
            const files = attachmentsInput.files;
            const fileList = Array.from(files);

            // Validate files (optional - backend will also validate)
            const maxFileSize = 5 * 1024 * 1024; // 5MB
            const invalidFiles = fileList.filter(file => file.size > maxFileSize);
            if (invalidFiles.length > 0) {
                alert(`Some files exceed the 5MB size limit: ${invalidFiles.map(f => f.name).join(', ')}`);
                return;
            }

            // Show loading state
            const submitBtn = postForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating Announcement...';

            // Prepare announcement data
            const announcementData = {
                title: title,
                content: content,
                files: fileList
            };

            // Submit to API
            const response = await api.createAnnouncement(announcementData);

            if (response.success) {
                alert(`Announcement "${title}" created successfully${fileList.length > 0 ? ` with ${fileList.length} attachment(s)` : ''}!`);

                // Reset form
                postForm.reset();

                // Optionally refresh the page to show new announcement
                // window.location.reload();

            } else {
                throw new Error(response.message || 'Failed to create announcement');
            }

        } catch (error) {
            console.error('Announcement creation error:', error);
            alert(`Failed to create announcement: ${error.message}`);
        } finally {
            // Reset button
            const submitBtn = postForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Post';
            }
        }
    });
}

// Event Form
const eventForm = document.getElementById('eventForm');
if (eventForm) {
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Event added successfully!');
    });
}

// Settings Form
const settingsForm = document.getElementById('settingsForm');
if (settingsForm) {
    settingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Settings saved successfully!');
    });
}

// Notification Form
const notificationForm = document.getElementById('notificationForm');
if (notificationForm) {
    notificationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Notification sent successfully!');
    });
}
