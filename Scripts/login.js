// created by rudy for HW4 part0

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let username = event.target.username.value;
    let password = event.target.password.value;
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => {
            if (!response.ok) {
                alert("username or password incorrect! Please Try again...")
                throw new Error(`HTTP error! status: ${response.status}`);
            } else if (!response.headers.get("Content-Type").includes("application/json")) {
                throw new Error("HTTP response is not JSON");
            } else {
                return response.json();
            }
            // return response.json()
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                // Checking the role and redirect accordingly
                if (data.role === "admin") {
                    location.href = "./AdminDashboard/index.html"; // after login Admin
                }
                location.href = './Dashboard/index.html';  // after login user
            } else {
                alert('Invalid username or password');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
