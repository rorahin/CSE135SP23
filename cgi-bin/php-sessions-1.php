

<?php
header("Cache-Control: no-cache");

// Get Name from Environment
$username = fgets(STDIN);

// Check to see if a proper name was sent
$name = "";
if ($username[0] == 'u')
{
  $name = substr($username, 9);
}

// Set the cookie using a header, add extra \n to end headers
if (strlen($name) > 0)
{
  header("Content-type: text/html");
  header("Set-Cookie: " . $name);
  echo "\n";
}
else
{
  header("Content-type: text/html");
  echo "\n";
}

// Body - HTML
echo "<html>";
echo "<head><title>PHP Sessions</title></head>\n";
echo "<body>";
echo "<h1>PHP Sessions Page 1</h1>";
echo "<table>";

// First check for new Cookie, then Check for old Cookie
if (strlen($name) > 0)
{
  echo "<tr><td>Cookie:</td><td>" . $name . "</td></tr>\n";
}
else if (isset($_COOKIE) && $_COOKIE != "destroyed")
{
  echo "<tr><td>Cookie:</td><td>" . $_COOKIE . "</td></tr>\n";
}
else
{
  echo "<tr><td>Cookie:</td><td>None</td></tr>\n";
}

echo "</table>";

// Links for other pages
echo "<br />";
echo "<a href=\"/cgi-bin/php-sessions-2.php\">Session Page 2</a>";
echo "<br />";
echo "<a href=\"/php-cgiform.html\">C CGI Form</a>";
echo "<br /><br />";

// Destroy Cookie button
echo "<form action=\"/cgi-bin/php-destroy-session.php\" method=\"get\">";
echo "<button type=\"submit\">Destroy Session</button>";
echo "</form>";

echo "</body>";
echo "</html>";
?>
