<?php

require 'vendor/autoload.php';
require 'connection.php';

$app = new Slim\App(['settings' => ['displayErrorDetails' => true]]);


$app->get('/',function($request, $response, $args){
    $response->write("Welcome to my api");
});

$app->get('/events/categories','getCategories');
$app->get('/events/categories/{id}','getEventByCategory');
$app->get('/events','getEventList');
$app->get('/events/{id}','getEvent');

function getEvent($request, $response, $args){
    $db = getDB();
    $id = $args['id'];
    $q = $db->prepare("SELECT * FROM Events JOIN EventDetails ON Events.id = EventDetails.id  WHERE Events.id=?");
    $q->execute(array($id));
    $json = json_encode($q->fetch(PDO::FETCH_ASSOC));
    $response->write($json);
}

function getEventByCategory($request, $response, $args){
    $db = getDB();
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

function getEventList($request, $response, $args){
    $db = getDB();

    $categories = $db->query("SELECT * FROM EventCategories");
    $categories = $categories->fetchAll(PDO::FETCH_GROUP|PDO::FETCH_UNIQUE|PDO::FETCH_ASSOC);

    $events = $db->query("SELECT * FROM Events JOIN EventDetails ON Events.id = EventDetails.id");
    //$events = $events->fetchAll(PDO::FETCH_ASSOC);

    while($row = $events->fetch(PDO::FETCH_ASSOC)){
        $categories[$row['category']]['events'][] = $row;
    }

    $json = json_encode($categories);
    $response->write($json);
}

function getCategories($request, $response, $args){
    $db = getDB();

    $categories = $db->query("SELECT * FROM EventCategories");
    $categories = $categories->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($categories);
    $response->write($json);
}


$app->run();
