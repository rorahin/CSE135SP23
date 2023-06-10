// create by rudy for HW4 part 0
document.getElementById('logout-btn').addEventListener('click', function () {
    localStorage.removeItem('token');
    location.href = '../login.html'; // check the route ............................
});

document.getElementById('generate-report').addEventListener('click', function () {
    location.href = '../metricname.html'; // check the route ............................
});

document.getElementById('logout').addEventListener('click', function () {
    location.href = './logout.html'; // check the route ............................
});