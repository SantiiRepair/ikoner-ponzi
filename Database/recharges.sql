-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 01, 2022 at 09:09 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `recharges`
--

CREATE TABLE `recharges` (
  `id` int(11) NOT NULL,
  `username` varchar(220) DEFAULT NULL,
  `hash` varchar(220) DEFAULT NULL,
  `amount` int(220) DEFAULT NULL,
  `status` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recharges`
--

INSERT INTO `recharges` (`id`, `username`, `hash`, `amount`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Tarek', '861b46977e18caa7700b7b99c0de825d8943c9ce0c08f4e04680259b1512922d', 20, 'Success Operation', '2022-11-30 00:08:38', '2022-11-30 00:08:38'),
(2, 'Tarek', '861b46977e18caa7700b7b99c0de825d8943c9ce0c08f4e04680259b1512922d', 20, 'Success Operation', '2022-11-30 00:11:29', '2022-11-30 00:11:29'),
(3, 'Tarek', '861b46977e18caa7700b7b99c0de825d8943c9ce0c08f4e04680259b1512922d', 20, 'Success Operation', '2022-11-30 00:32:54', '2022-11-30 00:32:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recharges`
--
ALTER TABLE `recharges`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recharges`
--
ALTER TABLE `recharges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
