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
            window.location.href = 'index.html';
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