-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 19, 2022 at 09:55 PM
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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `balance` int(220) DEFAULT NULL,
  `vip` int(220) DEFAULT NULL,
  `levelTime` int(10) DEFAULT NULL,
  `daily` int(10) DEFAULT NULL,
  `user_code` varchar(220) DEFAULT NULL,
  `ref_code` varchar(220) DEFAULT NULL,
  `ipv4` varchar(220) DEFAULT NULL,
  `address` varchar(220) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `balance`, `vip`, `levelTime`, `daily`, `user_code`, `ref_code`, `ipv4`, `address`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'Tarek', 'tarek@gmail.com', '$2b$10$78ZRB0LZOcg7nQ2e5NVicuqZxaeL5ocKXLyZjMdNMRzPxatiPC7xq', 44, 1, 4, 2, 'A5fwXp', 'H34IOSA', '', 'TTCNmWtT7SUuzjFYQFFnXSuZUYwhuXGjKd', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiVGFyZWsiLCJlbWFpbCI6InRhcmVrQGdtYWlsLmNvbSIsImlhdCI6MTY3MTQyNjQyOSwiZXhwIjoxNjcxNTEyODI5fQ.txXSEjhD7eVLCW69zJHL1Qp9asSEhqY8mT82wkaZECs', '2022-11-15 03:23:07', '2022-12-19 05:37:42'),
(2, 'Skawagoshi', 'skawagoshi@gmail.com', '$2b$10$ofeH6yZ54ml7QSoBiA4X2uFIUAWzoBUgpmnmvo.LlPRfcxYgl2cBO', 11, NULL, NULL, NULL, 'XC8uoi', 'A5fwXp', NULL, NULL, NULL, '2022-12-08 16:23:29', '2022-12-08 16:23:29'),
(30, 'Boteo', 'cananeo@gmail.com', '$2b$10$CTy5mwMu9Y0hFT8D98GOBusuvoler7G3FbaVPGgLZG0le/MFXjmj2', 11, 2, NULL, NULL, 'yF1Za6', 'A5fwXp', '', 'TTCNmWtT7SUuzjFYQFFnXSuZUYwhuXGjKx', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwLCJ1c2VybmFtZSI6IkJvdGVvIiwiZW1haWwiOiJjYW5hbmVvQGdtYWlsLmNvbSIsImlhdCI6MTY3MTM0MTkxMiwiZXhwIjoxNjcxNDI4MzEyfQ.yOBsnGnv6sQ-Kn-812iPIOVU7eNLhhg-IOolokpLYjI', '2022-12-09 06:17:49', '2022-12-18 05:38:32'),
(31, 'Aro', 'aro@gmail.com', '$2b$10$MI99kcYYqLGFpeUoBBbX2OIYqAAvPQ56tD5yohsurf1ki7GecfOHW', 30, 3, NULL, NULL, 'DFpIhS', 'A5fwXp', '', NULL, NULL, '2022-12-14 04:50:35', '2022-12-17 06:42:52'),
(32, 'Hod', 'hod@gmail.com', '$2b$10$7nQjzBBJ6SNloRanAl2DlearuPyj4GZ91FwI8Yv0tQwQu1VGSkMEy', 9, NULL, NULL, NULL, 'VdGmi6', 'A5fwXp', '', 'TTCNmWtT7SUuzjFYQFFnXSuZUYwhuXGjKp', NULL, '2022-12-19 05:01:19', '2022-12-19 05:06:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
