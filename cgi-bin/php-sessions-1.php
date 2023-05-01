<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'])) {
    $_SESSION['username'] = $_POST['username'];
    header('Location: state-demo-2.php');
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
	<title>State Demo - Page 1</title>
</head>
<body>
	<h1>State Demo - Page 1</h1>
	<form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
		<label for="username">Enter your name:</label>
		<input type="text" id="username" name="username">
		<button type="submit">Submit</button>
	</form>
</body>
</html>
