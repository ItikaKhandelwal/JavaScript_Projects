document.getElementById('registrationForm').addEventListener('submit', function(event) {
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const phonePattern = /^\d{10}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

    if (!phonePattern.test(phone)) {
        alert('Phone number must be exactly 10 digits.');
        event.preventDefault();
        return;
    }

    if (!passwordPattern.test(password)) {
        alert('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 10 characters long.');
        event.preventDefault();
    }
});