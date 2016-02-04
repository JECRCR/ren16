<?php

require 'vendor/autoload.php';
require '../inc/connection.php';

$app = new Slim\App(['settings' => ['displayErrorDetails' => true]]);

$app->get('/',function($request, $response, $args){
    $response->write("JECRC Renaissance 16 API");
});

// get all the categories with details
$app->get('/events/categories','getCategories');

// get the details and events for a particular category
$app->get('/events/categories/{id}','getEventByCategory');

//get all the events
$app->get('/events','getEvents');

//get event details of particular event
$app->get('/events/{id}','getEvent');

function getEvent($request, $response, $args){
    global $db;
    $id = $args['id'];
    $q = $db->prepare("SELECT * FROM Events JOIN EventDetails ON Events.id = EventDetails.id  WHERE Events.id=?");
    $q->execute(array($id));

    $json = json_encode($q->fetch(PDO::FETCH_ASSOC));
    $response->write($json);
}

function getEventByCategory($request, $response, $args){
    global $db;
    $id= $args['id'];
    $categories = $db->prepare("SELECT * FROM EventCategories WHERE id=?");
    $categories->execute(array($id));
    $categories = $categories->fetch(PDO::FETCH_ASSOC);

    $events = $db->prepare("SELECT * FROM Events JOIN EventDetails ON Events.id = EventDetails.id AND Events.category = ?");
    $events->execute(array($id));
    $events = $events->fetchAll(PDO::FETCH_ASSOC);

    $json = json_encode(array("details"=> $categories ,"events"=> $events));
    $response->write($json);
}

function getEvents($request, $response, $args){
    global $db;
    $categories = $db->query("SELECT * FROM EventCategories");
    $categories = $categories->fetchAll(PDO::FETCH_GROUP|PDO::FETCH_UNIQUE|PDO::FETCH_ASSOC);

    $events = $db->query("SELECT * FROM Events JOIN EventDetails ON Events.id = EventDetails.id");

    while($row = $events->fetch(PDO::FETCH_ASSOC)){
        $categories[$row['category']]['events'][] = $row;
    }

    $json = json_encode($categories);
    $response->write($json);
}

function getCategories($request, $response, $args){
    global $db;
    $categories = $db->query("SELECT * FROM EventCategories");
    $categories = $categories->fetchAll(PDO::FETCH_ASSOC);

    $json = json_encode($categories);
    $response->write($json);
}

$app->run();
