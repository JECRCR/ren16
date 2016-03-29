<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers:
        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

require 'vendor/autoload.php';
require '../config.php';
require '../inc/connection.php';

$app = new Slim\App(['settings' => ['displayErrorDetails' => true]]);

$app->get('/', function ($request, $response, $args) {
    $response->write('JECRC Renaissance 16 API');
});

// get all the categories with details
$app->get('/events/categories', 'getCategories');

// get the details and events for a particular category
$app->get('/events/categories/{id}', 'getEventByCategory');

//get all the events
$app->get('/events', 'getEvents');
$app->get('/events-save', 'getEventsAndSave');
$app->get('/events-get', 'getEventsFromFile');

//get event details of particular event
$app->get('/events/{id}', 'getEvent');

function getEvent($request, $response, $args) {
    global $db;
    $id = $args['id'];
    $q = $db->prepare('SELECT * FROM events JOIN eventdetails ON events.id = eventdetails.id  WHERE events.id=?');
    $q->execute(array($id));

    $json = json_encode($q->fetch(PDO::FETCH_ASSOC));
    $response->write($json);
}

function getEventByCategory($request, $response, $args) {
    global $db;
    $id = $args['id'];
    $categories = $db->prepare('SELECT * FROM eventcategories WHERE id=?');
    $categories->execute(array($id));
    $categories = $categories->fetch(PDO::FETCH_ASSOC);

    $events = $db->prepare('SELECT * FROM events JOIN eventdetails ON events.id = eventdetails.id AND events.category = ?');
    $events->execute(array($id));
    $events = $events->fetchAll(PDO::FETCH_ASSOC);

    $json = json_encode(array('details' => $categories, 'events' => $events));
    $response->write($json);
}

function getEvents($request, $response, $args) {
    global $db;
    $categories = $db->query('SELECT * FROM eventcategories');
    $categories = $categories->fetchAll(PDO::FETCH_GROUP | PDO::FETCH_UNIQUE | PDO::FETCH_ASSOC);

    $events = $db->query('SELECT * FROM events JOIN eventdetails ON events.id = eventdetails.id');

    while ($row = $events->fetch(PDO::FETCH_ASSOC)) {
        $categories[$row['category']]['events'][] = $row;
    }

    $json = json_encode($categories);
    $response->write($json);
}

function getEventsAndSave($request, $response, $args) {
    global $db;
    $categories = $db->query('SELECT * FROM eventcategories');
    $categories = $categories->fetchAll(PDO::FETCH_GROUP | PDO::FETCH_UNIQUE | PDO::FETCH_ASSOC);

    $events = $db->query('SELECT * FROM events JOIN eventdetails ON events.id = eventdetails.id');

    while ($row = $events->fetch(PDO::FETCH_ASSOC)) {
        $categories[$row['category']]['events'][] = $row;
    }

    $json = json_encode($categories);
    echo file_put_contents('../events.json', $json);
    echo 'hello';
}

function getEventsFromFile($request, $response, $args) {
    $response->write(file_get_contents('../events.json'));
}

function getCategories($request, $response, $args) {
    global $db;
    $categories = $db->query('SELECT * FROM eventcategories');
    $categories = $categories->fetchAll(PDO::FETCH_ASSOC);

    $json = json_encode($categories);
    $response->write($json);
}

$app->run();
