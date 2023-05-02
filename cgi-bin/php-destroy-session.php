<?php
// Headers
header("Cache-Control: no-cache");
setcookie("destroyed", "1", time()-3600); // set cookie with a past time to expire it
header("Content-type: text/html");

// Destroy session
session_start();
session_unset();
session_destroy();

// Body - HTML
echo "<html>";
echo "<head><title>PHP Session Destroyed</title></head>";
echo "<body>";
echo "<h1>PHP Session Destroyed</h1>";

// Links
echo "<a href=\"/cgi-bin/php-sessions-1.php\">Back to Page 1</a>";
echo "<br />";
echo "<a href=\"/cgi-bin/php-sessions-2.php\">Back to Page 2</a>";
echo "<br />";
echo "<a href=\"/php-cgiform.html\">PHP CGI Form</a>";

echo "</body>";
echo "</html>";
?>
