DROP TABLE IF EXISTS `dashboard`;
CREATE TABLE `dashboard` (
  `username` varchar(40) NOT NULL,
  `password` varchar(100) NOT NULL,
  `type` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `ebay_register`;
CREATE TABLE `ebay_register` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `valid` int(11) DEFAULT NULL,
  `time` datetime NOT NULL,
  `email_c` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `eventcategories`;
CREATE TABLE `eventcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `thumb` varchar(50) NOT NULL,
  `coordinators` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `eventdetails`;
CREATE TABLE `eventdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `about` text NOT NULL,
  `rules` text NOT NULL,
  `fees` varchar(250) NOT NULL DEFAULT '',
  `thumbnail` varchar(100) NOT NULL,
  `venue` varchar(250) NOT NULL,
  `prize` varchar(500) NOT NULL DEFAULT '',
  `coordinators` varchar(500) NOT NULL DEFAULT '',
  `class` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `category` int(11) NOT NULL,
  `type` int(2) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `registrations`;
CREATE TABLE `registrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `teamname` varchar(300) NOT NULL DEFAULT '',
  `team` varchar(1000) NOT NULL DEFAULT '',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `college` varchar(80) NOT NULL,
  `city` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `dp` varchar(50) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
