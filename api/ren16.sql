
CREATE TABLE IF NOT EXISTS `Coordinators` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100),
  `eventid` int(11) NOT NULL,
  `phone` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `EventCategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `thumb` varchar(50) NOT NULL,
  `coordinators` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

CREATE TABLE IF NOT EXISTS `EventDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `about` varchar(500) NOT NULL,
  `rules` varchar(500) NOT NULL,
  `fees` varchar(50) NOT NULL,
  `thumbnail` varchar(100) NOT NULL,
  `venue` varchar(250) NOT NULL,
  `prize` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

CREATE TABLE IF NOT EXISTS `Events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `category` int(11) NOT NULL,
  `type` int(2),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

CREATE TABLE IF NOT EXISTS `Registrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `teamname` varchar(50) NOT NULL,
  `team` varchar(250) NOT NULL,
  `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `Users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `college` varchar(80) NOT NULL,
  `city` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact` int(15) NOT NULL,
  `dp` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Dashboard` (
  `username` varchar(40) NOT NULL,
  `password` varchar(100) NOT NULL,
  `type` int(2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
