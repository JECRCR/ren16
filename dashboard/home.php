<?php

    require_once("inc/functions.php");
    if(!isset($_SESSION['username']) || $_GET['u']!=$_SESSION['username']){
        header('Location: logout.php');
    }

    $eventID = 0;
    switch ($_GET['u']) {
        case 'splash':
            $eventID = 1; break;
        case 'quanta':
            $eventID = 2; break;
        case 'endeavour':
            $eventID = 3; break;
    }

    require "inc/header.php";
    require_once("../config.php");
    require_once("../inc/connection.php");
?>

<div class="stats">
    <span id="reg">
        <?php
            global $db;
            $data = "";
            if($eventID==0){
                $q = $db->prepare("SELECT count(name) FROM users JOIN registrations ON registrations.`userId` = users.id WHERE registrations.`eventId` like '1%%'");
                $q->execute();
                $data = "Splash: ".$q->fetch()['count(name)'];

                $q = $db->prepare("SELECT count(name) FROM users JOIN registrations ON registrations.`userId` = users.id WHERE registrations.`eventId` like '2%%'");
                $q->execute();
                $data .= " | Quanta: ".$q->fetch()['count(name)'];

                $q = $db->prepare("SELECT count(name) FROM users JOIN registrations ON registrations.`userId` = users.id WHERE registrations.`eventId` like '3%%'");
                $q->execute();
                $data .= " | Endeavour: ".$q->fetch()['count(name)'];
            } else{
                $q = $db->prepare("SELECT count(name) FROM users JOIN registrations ON registrations.`userId` = users.id WHERE registrations.`eventId` like '$eventID%%'");
                $q->execute();
                $data = "Total Registrations: ".$q->fetch()['count(name)'];
            }
            echo $data;
         ?>
    </span>
</div>
<div class="container">
    <?php
        if($eventID == 0){
            echo '
            <div class="col-sm-12 category radio">
                <label><input type="radio" name="category" value="1">SPLASH</label>
                <label><input type="radio" name="category" value="2">QUANTA</label>
                <label><input type="radio" name="category" value="3">ENDEAVOUR</label>
            </div>
            ';
        }
    ?>

    <div class="col-sm-12 dropdown events">
        <button class="btn btn-default dropdown-toggle" type="button" id="eventNames" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Select Event
            <span class="caret"></span>
        </button>
        <ul id="event-dropdown" class="" aria-labelledby="eventCategory">
        </ul>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>College</th>
                <th>City</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Team Name</th>
                <th>Team</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>

</div>

<?php require "inc/footer.php"; ?>
