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
-- Table structure for table `withdrawals`
--

CREATE TABLE `withdrawals` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `to` varchar(220) DEFAULT NULL,
  `amount` int(220) DEFAULT NULL,
  `status` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `withdrawals`
--

INSERT INTO `withdrawals` (`id`, `username`, `to`, `amount`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Gabriel ', 'TTCNmWtT7SUuzjFYQFFnXSuZUYwhuXGjKd', 12, 'Success Operation', '2022-11-29 01:22:35', '2022-11-29 01:22:35'),
(2, 'Gabriel ', 'TTCNmWtT7SUuzjFYQFFnXSuZUYwhuXGjKd', 12, 'Success Operation', '2022-11-29 01:24:44', '2022-11-29 01:24:44'),
(3, 'Gabriel ', 'TTCNmWtT7SUuzjFYQFFnXSuZUYwhuXGjKd', 17, 'Success Operation', '2022-11-29 01:26:07', '2022-11-29 01:26:07'),
(4, 'Tarek', 'TTCNmWtT7SUuzjFYQFFnXSuZUYwhuXGjKd', 900, 'Success Operation', '2022-11-30 00:11:09', '2022-11-30 00:11:09'),
(5, 'Tarek', 'TTCNmWtT7SUuzjFYQFFnXSuZUYwhuXGjKd', 2000, 'Success Operation', '2022-11-30 00:32:41', '2022-11-30 00:32:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `withdrawals`
--
ALTER TABLE `withdrawals`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `withdrawals`
--
ALTER TABLE `withdrawals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
