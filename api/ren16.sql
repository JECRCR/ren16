-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 04, 2016 at 01:40 PM
-- Server version: 5.5.47-MariaDB-1ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ren16`
--

-- --------------------------------------------------------

--
-- Table structure for table `Coordinators`
--

CREATE TABLE IF NOT EXISTS `Coordinators` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `eventid` int(11) NOT NULL,
  `phone` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `EventCategories`
--

CREATE TABLE IF NOT EXISTS `EventCategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `thumb` varchar(50) NOT NULL,
  `coordinators` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `EventCategories`
--

INSERT INTO `EventCategories` (`id`, `name`, `thumb`, `coordinators`) VALUES
(1, 'Splash', 'splash.png', 'lokesh Devnani\r\nUdit Vasu'),
(2, 'Quanta', 'quanta.png', 'Udit Vasu'),
(3, 'Technical', 'technical.png', 'Lokesh Devnani');

-- --------------------------------------------------------

--
-- Table structure for table `EventDetails`
--

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

--
-- Dumping data for table `EventDetails`
--

INSERT INTO `EventDetails` (`id`, `about`, `rules`, `fees`, `thumbnail`, `venue`, `prize`) VALUES
(1, 'Street Dance', 'There are no rules on street', '1000', 'street.jpg', '', ''),
(2, 'Group Dance Competition', 'Just do everything in sync', '2000', 'street.jpg', '', ''),
(3, 'Coding Competition', 'Do it', '400', 'algo.png', '', ''),
(4, 'Robo battle', 'terminator', '200', 'robo.png', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `Events`
--

CREATE TABLE IF NOT EXISTS `Events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `category` int(11) NOT NULL,
  `type` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `Events`
--

INSERT INTO `Events` (`id`, `name`, `category`, `type`) VALUES
(1, 'Step Up', 1, '0'),
(2, 'Bootstrapping', 1, '0'),
(3, 'Algoholic', 3, '0'),
(4, 'Robo Wars', 2, '0');

-- --------------------------------------------------------

--
-- Table structure for table `Registrations`
--

CREATE TABLE IF NOT EXISTS `Registrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `teamname` varchar(50) NOT NULL,
  `team` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `college` int(50) NOT NULL,
  `city` int(50) NOT NULL,
  `email` int(11) NOT NULL,
  `contact` int(11) NOT NULL,
  `dp` int(11) NOT NULL,
  `password` varchar(50) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
