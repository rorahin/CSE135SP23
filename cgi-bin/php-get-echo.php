<!DOCTYPE html>
<html>
  <head>
    <title>GET Request Echo</title>
  </head>
  <body>
    <h1>Get Request Echo</h1>
    <hr>
    <?php
      // The query string is stored in the $_SERVER superglobal array
      $query = $_SERVER['QUERY_STRING'];
      
      // Parse the query string into an associative array
      parse_str($query, $params);
      
      // Output each parameter and its value
      foreach ($params as $key => $value) {
        echo "<b>$key:</b> $value<br />\n";
      }
    ?>
  </body>
</html>
