<?php
// Access PHP Session
session_start();

// Create a new CGI Object
$cgi = new CGI();

// Get the Session ID from the Cookie
$sid = isset($_COOKIE['CGISESSID']) ? $_COOKIE['CGISESSID'] : null;
$session = new CGI::Session(undef, $sid, {Directory=>'/tmp'});

// Access Stored Data
$name = $session->param("username");

header("Content-Type: text/html");

echo "<html>";
echo "<head>";
echo "<title>PHP Sessions</title>";
echo "</head>";
echo "<body>";

echo "<h1>PHP Sessions Page 2</h1>";

if ($name){
	echo "<p><b>Name:</b> $name</p>";
}else{
	echo "<p><b>Name:</b> You do not have a name set</p>";
}
echo "<br/><br/>";
echo "<a href=\"/cgi-bin/php-sessions-1.php\">Session Page 1</a><br/>";
echo "<a href=\"/php-cgiform.html\">PHP CGI Form</a><br />";
echo "<form style=\"margin-top:30px\" action=\"/cgi-bin/php-destroy-session.php\" method=\"get\">";
echo "<button type=\"submit\">Destroy Session</button>";
echo "</form>";

echo "</body>";
echo "</html>";
?>
