<?php
// Set headers to prevent caching and specify response as HTML
header("Cache-Control: no-cache");
header("Content-type: text/html");

// Print HTML file top
echo <<<END
<!DOCTYPE html>
<html>
<head>
  <title>POST Request Echo</title>
</head>
<body>
  <h1 align="center">POST Request Echo</h1>
  <hr>
END;

// Read the request body
$postdata = file_get_contents("php://input");

// Parse the request body
parse_str($postdata, $request);

echo "<b>Message Body:</b><br />\n";
echo "<ul>\n";

// Print out the request data
foreach ($request as $key => $value) {
  echo "<li>$key = $value</li>\n";
}

echo "</ul>\n";

// Print HTML file bottom
echo "</body></html>\n";
?>
