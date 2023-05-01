<?php
session_start();
session_destroy();
setcookie("PHPSESSID", "", time() - 3600, "/");
?>
<html>
<head>
<title>PHP Session Destroyed</title>
</head>
<body>
<h1>Session Destroyed</h1>
<a href="/php-cgiform.html">Back to the PHP CGI Form</a><br />
<a href="/php-sessions-1.php">Back to Page 1</a><br />
<a href="/php-sessions-2.php">Back to Page 2</a>
</body>
</html>
