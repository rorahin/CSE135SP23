<?php
// Start session
session_start();

// Check if username is set in session
if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
} else {
    $username = 'unknown';
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>State Demo 2</title>
</head>

<body>
    <h1>State Demo 2</h1>
    <p>Hello <?php echo $username; ?>!</p>
    <a href="state-demo.php">Go back</a>
</body>

</html>
