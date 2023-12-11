const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Login
async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Replace with actual login check logic
        const loginSuccessful = await checkLogin(email, password);

        if (!loginSuccessful) {
            throw new Error('Login failed');
        }

        showNotification('Login successful!');
        setTimeout(() => {
            window.location.href = '/pages-html/index.html';
        }, 2000);
    } catch (error) {
        console.error('Error:', error);
        showNotification('Incorrect email or password.');
    }
}

// Simulate a login check by comparing the email and password with hardcoded values
async function checkLogin(email, password) {
    const hardcodedCredentials = [
        { email: 'admin@gmail.com', password: 'admin' },
    ];

    return hardcodedCredentials.some(user => user.email === email && user.password === password);
}

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    loginUser();
});

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}


// Function to validate the password
function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
    return passwordRegex.test(password);
}

// Registration
async function registerUser() {
    const name = document.getElementById('text-register').value;
    const email = document.getElementById('email-register').value;
    const password = document.getElementById('password-register').value;

    try {
        // Check if the name field is blank
        if (!name.trim()) {
            throw new Error('Name cannot be blank.');
        }

        // Check if the email field is blank
        if (!email.trim()) {
            throw new Error('Email cannot be blank.');
        }

        // Check if the password field is blank
        if (!password.trim()) {
            throw new Error('Password cannot be blank.');
        }

        // Validate the password
        if (!validatePassword(password)) {
            throw new Error('Password must be more than 8 characters, start with a capital letter, and contain one special character.');
        }

        // Replace with actual registration logic
        const registrationSuccessful = await registerNewUser(name, email, password);

        if (!registrationSuccessful) {
            throw new Error('Registration failed');
        }

        showNotificationRegister('Registration successful!');
        setTimeout(() => {
            window.location.href = '/pages-html/index.html';
        }, 2000);
    } catch (error) {
        console.error('Error:', error);
        showNotificationRegister(error.message || 'Registration failed.');
    }
}

// Simulate a registration process
async function registerNewUser(name, email, password) {
    // For demonstration purposes, allowing blank values
    return true;
}

document.getElementById('registerForm').addEventListener('submit', (event) => {
    event.preventDefault();
    registerUser();
});

function showNotificationRegister(message) {
    const notification = document.getElementById('notification-register');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}
