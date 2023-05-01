<?php
session_start(); // Start or resume the session

// Store data in the session
if (isset($_POST['username'])) {
  $_SESSION['username'] = $_POST['username'];
}

// Set a cookie with the session ID
$session_id = session_id();
setcookie('PHPSESSID', $session_id);

// Retrieve data from the session
$name = $_SESSION['username'] ?? null;

// Output HTML
echo "<html>";
echo "<head>";
echo "<title>PHP Sessions</title>";
echo "</head>";
echo "<body>";

echo "<h1>PHP Sessions Page 1</h1>";

if ($name){
  echo "<p><b>Name:</b> $name";
} else {
  echo "<p><b>Name:</b> You do not have a name set</p>";
}
echo "<br/><br/>";
echo "<a href=\"/php-sessions-2.php\">Session Page 2</a><br/>";
echo "<a href=\"/php-cgiform.html\">PHP CGI Form</a><br />";
echo "<form style=\"margin-top:30px\" action=\"/php-destroy-session.php\" method=\"get\">";
echo "<button type=\"submit\">Destroy Session</button>";
echo "</form>";

echo "</body>";
echo "</html>";
?>
