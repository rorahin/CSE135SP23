// create by rudy for HW4 part 0

if(!localStorage.getItem('token')) {
    alert("You need to login in first")
    location.href = '../login.html';
  }

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

