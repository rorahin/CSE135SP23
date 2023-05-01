<?php
session_start();

if (!isset($_SESSION['username'])) {
    header('Location: state-demo-1.php');
    exit;
}

$username = $_SESSION['username'];
?>

<!DOCTYPE html>
<html>
<head>
	<title>State Demo - Page 2</title>
</head>
<body>
	<h1>State Demo - Page 2</h1>
	<p>Hello, <?php echo htmlspecialchars($username); ?>!</p>
	<p>This is the second page of the demo. The content from the previous page has been shown via the session.</p>
	<a href="state-demo-1.php">Session Page 1</a>
</body>
</html>
