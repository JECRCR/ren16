<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="robots" content="noindex,nofollow">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Dashboard | Renaissance 16</title>
        <link href='../assets/css/bootstrap.min.css' rel=stylesheet />
        <link href='style.css' rel=stylesheet />
        <link href='../assets/img/site/favicon.ico' rel='icon' type='image/x-icon'/>
    </head>
    <body>
        <nav class="navbar navbar-default">
          <div class="container">
            <a class="navbar-brand" href="#">Dashboard</a>
            <?php
                if(isset($_SESSION['username'])){
                    echo '<button type="button" class="btn btn-default navbar-btn navbar-right" onclick="location.href=\'logout.php\'">Logout</button>';
                }
            ?>
          </div>
        </nav>
