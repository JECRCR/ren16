<?php

    require_once("inc/functions.php");
    if($_SESSION['username']!='jecrc'){
        header('Location: /dashboard');
    }
    require "inc/header.php";
?>

<div class="container">
    <div class="col-sm-4 category radio">
        <label><input type="radio" name='category' value="1">SPLASH</label>
        <label><input type="radio" name='category' value="2">QUANTA</label>
        <label><input type="radio" name='category' value="3">ENDEAVOUR</label>
    </div>

    <div class="col-sm-8 dropdown events">
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
