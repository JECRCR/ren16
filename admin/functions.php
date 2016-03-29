<?php

require_once '../inc/connection.php';

function addEvent($data) {
    global $db;
    $id = $data['id'];
    $name = $data['name'];
    $category = $data['category'];
    if (isset($data['radio'])) {
        $type = $data['radio'];
    } else {
        $type = 0;
    }
    $about = $data['about'];
    $rules = $data['rules'];
    $fees = $data['fees'];
    $venue = $data['venue'];
    $prize = $data['prize'];
    $coordinators = $data['coordinators'];
    $title = strtolower(str_replace(' ', '-', $name));

    $sql = 'INSERT INTO `events` (id, name, category, type, title) VALUES (:id, :name, :category, :type, :title)';
    $q = $db->prepare($sql);
    $q->execute(array(':id' => $id,
                     ':name' => $name,
                     ':category' => $category,
                     ':type' => $type,
                     ':title' => $title,
    ));

    if ($category == 1) {
        $thumbnail = 'splash/';
    } elseif ($category == 2) {
        $thumbnail = 'quanta/';
    } elseif ($category == 3) {
        $thumbnail = 'endeavour/';
    } elseif ($category == 4) {
        $thumbnail = 'alumni/';
    }
    $thumbnail .= $title.'.png';

    $sql = 'INSERT INTO `eventdetails` (id, about, rules, fees, thumbnail, venue, prize, coordinators) VALUES (:id, :about, :rules, :fees, :thumbnail, :venue, :prize, :coordinators)';
    $q = $db->prepare($sql);
    $q->execute(array(':id' => $id,
                     ':about' => $about,
                     ':rules' => $rules,
                     ':fees' => $fees,
                     ':thumbnail' => $thumbnail,
                     ':venue' => $venue,
                     ':prize' => $prize,
                     ':coordinators' => $coordinators,
    ));
}

function editEvent($data) {
    global $db;
    $id = $data['id'];
    $name = $data['name'];
    $about = $data['about'];
    $rules = $data['rules'];
    $fees = $data['fees'];
    $thumbnail = $data['thumbnail'];
    $venue = $data['venue'];
    $prize = $data['prize'];
    $coordinators = $data['coordinators'];

    $sql = 'UPDATE `events` SET name=:name WHERE id=:id';
    $q = $db->prepare($sql);
    $q->execute(array(':name' => $name,
                     ':id' => $id,
    ));

    $sql = 'UPDATE `eventdetails` SET about=:about, rules=:rules, fees=:fees, thumbnail=:thumbnail, venue=:venue, prize=:prize, coordinators=:coordinators WHERE id=:id';
    $q = $db->prepare($sql);
    $q->execute(array(':about' => $about,
                     ':rules' => $rules,
                     ':fees' => $fees,
                     ':thumbnail' => $thumbnail,
                     ':venue' => $venue,
                     ':prize' => $prize,
                     ':id' => $id,
                     ':coordinators' => $coordinators,
    ));
}

function addCoordinator($data) {
    global $db;
    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $eventid = $data['eventid'];

    $sql = 'INSERT INTO `coordinators` (name, email, phone, eventid) VALUES (:name, :email, :phone, :eventid)';
    $q = $db->prepare($sql);
    $q->execute(array(':name' => $name,
                     ':email' => $email,
                     ':phone' => $phone,
                     ':eventid' => $eventid,
    ));
}
