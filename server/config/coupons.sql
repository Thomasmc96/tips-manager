-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 07, 2024 at 03:51 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `coupons_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `paid` tinyint(4) NOT NULL DEFAULT 0,
  `predictions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`predictions`)),
  `subscribeToMails` tinyint(4) NOT NULL,
  `created_dtm` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_dtm` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`coupons_id`, `name`, `mail`, `paid`, `predictions`, `subscribeToMails`, `created_dtm`, `updated_dtm`) VALUES
(9, 'Thomas', 'thomas96mc@gmail.com', 0, '[{\"id\":7,\"prediction\":\"1\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"1\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"1\"},{\"id\":1,\"prediction\":\"2\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"2\"},{\"id\":4,\"prediction\":\"x\"}]', 1, '2024-01-18 16:09:40', '2024-02-01 15:44:44'),
(10, 'Thomas Marcus', 'hahha@dddk.dk', 1, '[{\"id\":7,\"prediction\":\"1\"},{\"id\":5,\"prediction\":\"1\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"2\"},{\"id\":10,\"prediction\":\"1\"},{\"id\":9,\"prediction\":\"1\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"2\"}]', 1, '2024-01-18 16:10:06', '2024-02-01 15:44:42'),
(11, 'Thomas Marcus Christensen', 'thomasyo@asd.dk', 0, '[{\"id\":7,\"prediction\":\"2\"},{\"id\":5,\"prediction\":\"2\"},{\"id\":8,\"prediction\":\"2\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"1\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"2\"}]', 0, '2024-01-18 16:10:28', '2024-02-01 15:44:36'),
(12, 'Buus', 'asdasdasd@asddd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"1\"},{\"id\":8,\"prediction\":\"2\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"2\"},{\"id\":1,\"prediction\":\"2\"},{\"id\":2,\"prediction\":\"2\"},{\"id\":3,\"prediction\":\"1\"},{\"id\":4,\"prediction\":\"2\"}]', 0, '2024-01-18 16:10:50', '2024-02-01 15:41:34'),
(13, 'ooooo', 'asd@asdd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"1\"},{\"id\":8,\"prediction\":\"2\"},{\"id\":9,\"prediction\":\"1\"},{\"id\":10,\"prediction\":\"2\"},{\"id\":6,\"prediction\":\"1\"},{\"id\":1,\"prediction\":\"1\"},{\"id\":2,\"prediction\":\"2\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"1\"}]', 0, '2024-01-18 16:11:08', '2024-02-01 15:41:33'),
(14, 'Ditte', 'diteasd@asd.dk', 0, '[{\"id\":7,\"prediction\":\"2\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"2\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"1\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"1\"},{\"id\":2,\"prediction\":\"2\"},{\"id\":3,\"prediction\":\"1\"},{\"id\":4,\"prediction\":\"x\"}]', 1, '2024-01-18 16:11:31', '2024-02-01 15:41:33'),
(15, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '2024-02-05 20:29:04'),
(16, 'Alma', 'asldsad@asd.dk', 0, '[{\"id\":7,\"prediction\":\"1\"},{\"id\":5,\"prediction\":\"1\"},{\"id\":8,\"prediction\":\"1\"},{\"id\":9,\"prediction\":\"1\"},{\"id\":6,\"prediction\":\"1\"},{\"id\":10,\"prediction\":\"1\"},{\"id\":1,\"prediction\":\"1\"},{\"id\":2,\"prediction\":\"1\"},{\"id\":3,\"prediction\":\"1\"},{\"id\":4,\"prediction\":\"1\"}]', 0, '2024-01-18 16:12:07', '2024-02-01 15:41:33'),
(17, 'Ditte Hansen', 'asdsad@asdd.dk', 1, '[{\"id\":7,\"prediction\":\"2\"},{\"id\":5,\"prediction\":\"1\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"1\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"1\"},{\"id\":1,\"prediction\":\"2\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"1\"},{\"id\":4,\"prediction\":\"2\"}]', 0, '2024-01-18 16:12:28', '2024-02-01 15:44:14'),
(18, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '2024-02-01 15:41:34'),
(19, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '2024-02-01 15:41:34'),
(20, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '2024-02-01 15:41:34'),
(21, 'Laban', '2asda@asd.dk', 1, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '2024-02-01 15:41:37'),
(22, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '0000-00-00 00:00:00'),
(23, 'Laban', '2asda@asd.dk', 1, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '2024-02-01 15:41:46'),
(24, 'Laban', '2asda@asd.dk', 1, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '2024-02-01 15:43:23'),
(25, 'Laban', '2asda@asd.dk', 1, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '2024-02-01 15:44:12'),
(26, 'Laban', '2asda@asd.dk', 1, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '2024-02-01 15:43:43'),
(27, 'Laban', '2asda@asd.dk', 1, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '2024-02-05 20:29:05'),
(28, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '0000-00-00 00:00:00'),
(29, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '0000-00-00 00:00:00'),
(30, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '0000-00-00 00:00:00'),
(31, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '0000-00-00 00:00:00'),
(32, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '2024-02-01 15:31:53'),
(33, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '0000-00-00 00:00:00'),
(34, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '0000-00-00 00:00:00'),
(35, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '0000-00-00 00:00:00'),
(36, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '0000-00-00 00:00:00'),
(37, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '0000-00-00 00:00:00'),
(38, 'Laban', '2asda@asd.dk', 0, '[{\"id\":7,\"prediction\":\"x\"},{\"id\":5,\"prediction\":\"x\"},{\"id\":8,\"prediction\":\"x\"},{\"id\":9,\"prediction\":\"x\"},{\"id\":6,\"prediction\":\"x\"},{\"id\":10,\"prediction\":\"x\"},{\"id\":1,\"prediction\":\"x\"},{\"id\":2,\"prediction\":\"x\"},{\"id\":3,\"prediction\":\"x\"},{\"id\":4,\"prediction\":\"x\"}]', 0, '2024-01-18 16:11:49', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`coupons_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `coupons_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
