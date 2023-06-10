document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const role = event.target.role.value;
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
    })
        .then(response => response.json({ status: 'ok' }))
        .then(data => {
            if (data.success) {
                location.href = '/login.html';
            } else {
                alert('Signup failed');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
