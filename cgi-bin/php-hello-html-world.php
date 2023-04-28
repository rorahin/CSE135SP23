<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="favicon/icons8-futurama-fry-120.png">
    <link rel="stylesheet" href="Styles/style.css" type="text/css" media="all" />
    <script defer src='./Scripts/index.js'></script>
    <title>Hello HTML World</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>Current Date/Time: <?php echo date('Y-m-d H:i:s'); ?></p>
    <p>User IP Address: <?php echo $_SERVER['REMOTE_ADDR']; ?></p>
  </body>
</html>
