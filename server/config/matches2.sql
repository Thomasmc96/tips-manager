-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2024 at 12:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tips_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `matches2`
--

CREATE TABLE `matches2` (
  `matches2_id` int(11) NOT NULL,
  `home_team` varchar(64) NOT NULL,
  `away_team` varchar(64) NOT NULL,
  `kickoff_dtm` datetime NOT NULL,
  `home_team_goals` int(11) DEFAULT NULL,
  `away_team_goals` int(11) DEFAULT NULL,
  `updated_dtm` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matches2`
--

INSERT INTO `matches2` (`matches2_id`, `home_team`, `away_team`, `kickoff_dtm`, `home_team_goals`, `away_team_goals`, `updated_dtm`) VALUES
(33, 'den', 'ned', '2024-01-14 09:20:00', 2, 1, '2024-01-14 09:21:32'),
(34, 'fra', 'den', '2024-01-28 09:21:00', NULL, NULL, '2024-01-14 09:31:10'),
(35, 'sui', 'eng', '2024-01-14 09:27:00', 2, 3, '2024-01-14 10:46:35'),
(36, 'den', 'kaz', '2024-02-25 09:42:00', NULL, NULL, NULL),
(37, 'bos', 'den', '2024-01-21 12:45:00', 1, 5, '2024-01-14 10:47:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `matches2`
--
ALTER TABLE `matches2`
  ADD PRIMARY KEY (`matches2_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `matches2`
--
ALTER TABLE `matches2`
  MODIFY `matches2_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
