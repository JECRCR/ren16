<?php
//require_once 'functions.php';
if (isset($_POST['addEvent'])) {
    addEvent($_POST);
} elseif (isset($_POST['editEvent'])) {
    editEvent($_POST);
} elseif (isset($_POST['addCoordinator'])) {
    addCoordinator($_POST);
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="robots" content="noindex,nofollow">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>ADMIN | Renaissance 16</title>
        <link href='../assets/css/bootstrap.min.css' rel=stylesheet />
        <link href='style.css' rel=stylesheet />
    </head>
    <body>
        <br>
        <div class="container">

            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#addEvent" aria-controls="addEvent" role="tab" data-toggle="tab">Add Event</a></li>
                <li role="presentation"><a href="#editEvent" aria-controls="editEvent" role="tab" data-toggle="tab">Edit Event</a></li>
            </ul>
            <br>
            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade in active" id="addEvent">
                    <?php include 'forms/addEvent.html'; ?>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="editEvent">
                    <?php include 'forms/editEvent.html'; ?>
                </div>
            </div>

        </div>

        <script src='../assets/js/jquery-1.11.2.min.js'></script>
        <script src='../assets/js/bootstrap.min.js'></script>
        <script src='script.js'></script>
    </body>
</html>
