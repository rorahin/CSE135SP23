<?php
// Start session
session_start();

// Check if form has been submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Save submitted name to session
    $_SESSION['username'] = $_POST['username'];
    // Redirect to page 2
    // header('Location: php-sessions-2.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>State Demo 1</title>
</head>

<body>
    <h1>State Demo 1</h1>
    <form method="POST">
        <label for="username">Enter your name:</label>
        <input type="text" id="username" name="username" required>
        <br><br>
        <button type="submit">Submit</button>
    </form>
</body>

</html>

