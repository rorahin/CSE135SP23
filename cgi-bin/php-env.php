<!DOCTYPE html>
<html>
  <head>
    <title>Environment Variables</title>
  </head>
  <body>
    <h1>Environment Variables</h1>
    <hr>
    <?php
      foreach ($_SERVER as $key => $value) {
        echo "<b>$key:</b> $value<br />\n";
      }
    ?>
  </body>
</html>
