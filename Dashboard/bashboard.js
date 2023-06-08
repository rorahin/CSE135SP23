// create by rudy for HW4 part 0
document.getElementById('logout-btn').addEventListener('click', function () {
    localStorage.removeItem('token');
    location.href = '../login.html'; // check the route ............................
});
