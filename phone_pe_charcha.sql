-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 18, 2018 at 05:21 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phone_pe_charcha`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `f_name` varchar(50) DEFAULT NULL,
  `l_name` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `active_status` enum('0','1') NOT NULL,
  `phone_verified` enum('0','1') NOT NULL,
  `email_verified` enum('0','1') NOT NULL,
  `delete_status` enum('0','1') NOT NULL,
  `user_type` int(11) NOT NULL DEFAULT '1',
  `register_source` enum('WEB','APP') DEFAULT 'APP',
  `added_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `__v` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `f_name`, `l_name`, `phone`, `email`, `active_status`, `phone_verified`, `email_verified`, `delete_status`, `user_type`, `register_source`, `added_date`, `last_updated`, `__v`) VALUES
(5, NULL, NULL, '8826363966', NULL, '0', '0', '0', '0', 1, 'APP', '2018-07-17 08:34:38', '2018-07-17 08:34:38', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_logins`
--

CREATE TABLE `user_logins` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `session_id` varchar(20) DEFAULT NULL,
  `otp` int(11) NOT NULL DEFAULT '0',
  `session_status` enum('0','1') NOT NULL DEFAULT '0',
  `login_status` enum('0','1') NOT NULL DEFAULT '0',
  `fill_type` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0=auto, 1=manual',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `__v` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_logins`
--

INSERT INTO `user_logins` (`id`, `user_id`, `session_id`, `otp`, `session_status`, `login_status`, `fill_type`, `created_on`, `last_updated`, `__v`) VALUES
(17, 5, 'dffgdfg', 567, '0', '0', '0', '2018-07-17 08:34:38', '2018-07-17 09:03:13', 2),
(18, 5, 'dffgdfg', 1234, '0', '0', '0', '2018-07-17 08:34:52', '2018-07-17 08:34:52', 0),
(19, 5, 'dffgdfg', 1234, '0', '0', '0', '2018-07-17 08:37:31', '2018-07-17 08:37:31', 0),
(20, 5, 'dffgdfg', 1234, '0', '0', '0', '2018-07-17 08:41:42', '2018-07-17 08:41:42', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `type_name` varchar(50) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `added_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `__v` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `type_name`, `status`, `sort_order`, `added_date`, `last_updated`, `__v`) VALUES
(1, 'SYSTEM', 1, 0, '2018-05-07 10:07:59', '2018-05-12 15:38:40', 0),
(2, 'SUPER_ADMIN', 1, 0, '2018-05-07 10:38:37', '2018-05-12 15:53:12', 0),
(3, 'ADMIN', 1, 0, '2018-05-07 11:01:42', '2018-05-12 15:38:40', 0),
(4, 'USER', 1, 0, '2018-05-07 11:56:29', '2018-05-12 15:38:40', 0),
(5, 'NEW_ROLE edited', 1, 0, '2018-07-13 23:07:26', '2018-07-13 23:12:44', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `user_logins`
--
ALTER TABLE `user_logins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type_name` (`type_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_logins`
--
ALTER TABLE `user_logins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
