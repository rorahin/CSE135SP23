// created by rudy for HW4 part0

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                location.href = './Dashboard/index.html';  // after login
            } else {
                alert('Invalid username or password');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
