// create by rudy for HW4 part 0

document.getElementById('logout-btn').addEventListener('click', function () {
    localStorage.removeItem('token');
    location.href = '../login.html'; // check the route ............................
});


document.getElementById('generate-report').addEventListener('click', function () {
    console.log("going to generate");
    location.href = '../metricname.html'; // check the route ............................
});


document.getElementById('users').addEventListener('click', function () {
    console.log("going to generate");
    location.href = './users.html'; // check the route ............................
});