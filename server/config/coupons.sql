-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2023 at 04:43 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

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
  `created_dtm` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`coupons_id`, `name`, `mail`, `paid`, `predictions`, `created_dtm`) VALUES
(1, 'hej', 'hejsa@asd.dk', 1, '[{\"id\":\"4044557\",\"prediction\":\"1\"},{\"id\":\"4044565\",\"prediction\":\"x\"},{\"id\":\"4044571\",\"prediction\":\"x\"},{\"id\":\"4044558\",\"prediction\":\"1\"},{\"id\":\"4044559\",\"prediction\":\"2\"},{\"id\":\"4044608\",\"prediction\":\"2\"},{\"id\":\"4044560\",\"prediction\":\"2\"}]', '2023-04-03 15:35:20'),
(2, 'hej2', 'hejsa2s@asd.dk', 0, '[{\"id\":\"4044557\",\"prediction\":\"x\"},{\"id\":\"4044565\",\"prediction\":\"1\"},{\"id\":\"4044571\",\"prediction\":\"1\"},{\"id\":\"4044558\",\"prediction\":\"1\"},{\"id\":\"4044559\",\"prediction\":\"1\"},{\"id\":\"4044608\",\"prediction\":\"1\"},{\"id\":\"4044560\",\"prediction\":\"1\"}]', '2023-04-03 15:35:20'),
(3, 'hej2s', 'hejsa2s@asd.dks', 0, '[{\"id\":\"4044557\",\"prediction\":\"x\"},{\"id\":\"4044565\",\"prediction\":\"1\"},{\"id\":\"4044571\",\"prediction\":\"1\"},{\"id\":\"4044558\",\"prediction\":\"1\"},{\"id\":\"4044559\",\"prediction\":\"1\"},{\"id\":\"4044608\",\"prediction\":\"1\"},{\"id\":\"4044560\",\"prediction\":\"1\"}]', '2023-04-03 15:35:20'),
(4, 'hej2s', 'hejsa2s@asd.dks', 0, '[{\"id\":\"4044557\",\"prediction\":\"x\"},{\"id\":\"4044565\",\"prediction\":\"1\"},{\"id\":\"4044571\",\"prediction\":\"1\"},{\"id\":\"4044558\",\"prediction\":\"1\"},{\"id\":\"4044559\",\"prediction\":\"1\"},{\"id\":\"4044608\",\"prediction\":\"1\"},{\"id\":\"4044560\",\"prediction\":\"1\"}]', '2023-04-03 15:35:20'),
(5, 'hej2s', 'hejsa2s@asd.dks', 0, '[{\"id\":\"4044557\",\"prediction\":\"x\"},{\"id\":\"4044565\",\"prediction\":\"1\"},{\"id\":\"4044571\",\"prediction\":\"1\"},{\"id\":\"4044558\",\"prediction\":\"1\"},{\"id\":\"4044559\",\"prediction\":\"1\"},{\"id\":\"4044608\",\"prediction\":\"1\"},{\"id\":\"4044560\",\"prediction\":\"1\"}]', '2023-04-03 15:35:20'),
(6, 'hej2s', 'hejsa2s@asd.dks', 0, '[{\"id\":\"4044557\",\"prediction\":\"x\"},{\"id\":\"4044565\",\"prediction\":\"x\"},{\"id\":\"4044571\",\"prediction\":\"1\"},{\"id\":\"4044558\",\"prediction\":\"2\"},{\"id\":\"4044559\",\"prediction\":\"x\"},{\"id\":\"4044608\",\"prediction\":\"1\"},{\"id\":\"4044560\",\"prediction\":\"x\"}]', '2023-04-03 15:35:20'),
(7, 'Thomas Marcus Christensen', 'asd@ad.dk', 0, '[{\"id\":\"4044557\",\"prediction\":\"x\"},{\"id\":\"4044565\",\"prediction\":\"1\"},{\"id\":\"4044571\",\"prediction\":\"x\"},{\"id\":\"4044558\",\"prediction\":\"x\"},{\"id\":\"4044559\",\"prediction\":\"2\"},{\"id\":\"4044608\",\"prediction\":\"2\"},{\"id\":\"4044560\",\"prediction\":\"2\"}]', '2023-04-03 15:35:20'),
(8, 'asd', 'asdasd@ad.dk', 0, '[{\"id\":\"4044557\",\"prediction\":\"x\"},{\"id\":\"4044565\",\"prediction\":\"1\"},{\"id\":\"4044558\",\"prediction\":\"1\"},{\"id\":\"4044571\",\"prediction\":\"x\"},{\"id\":\"4044559\",\"prediction\":\"x\"},{\"id\":\"4044608\",\"prediction\":\"2\"},{\"id\":\"4044560\",\"prediction\":\"x\"}]', '2023-04-03 15:35:20'),
(9, 'asd@asd.dk', '213asd@add.dk', 0, '[{\"id\":\"4044557\",\"prediction\":\"1\"},{\"id\":\"4044565\",\"prediction\":\"x\"},{\"id\":\"4044571\",\"prediction\":\"1\"},{\"id\":\"4044558\",\"prediction\":\"1\"},{\"id\":\"4044559\",\"prediction\":\"x\"},{\"id\":\"4044608\",\"prediction\":\"x\"},{\"id\":\"4044560\",\"prediction\":\"2\"}]', '2023-04-03 15:35:20'),
(10, 'asdasd', 'asdda@ad.dk', 0, '[{\"id\":\"4044557\",\"prediction\":\"x\"},{\"id\":\"4044565\",\"prediction\":\"1\"},{\"id\":\"4044571\",\"prediction\":\"x\"},{\"id\":\"4044558\",\"prediction\":\"2\"},{\"id\":\"4044559\",\"prediction\":\"x\"},{\"id\":\"4044608\",\"prediction\":\"1\"},{\"id\":\"4044560\",\"prediction\":\"x\"}]', '2023-04-03 15:35:20'),
(11, 'Laban', 'null', 0, '[{\"id\":\"4044557\",\"prediction\":\"1\"},{\"id\":\"4044565\",\"prediction\":\"x\"},{\"id\":\"4044571\",\"prediction\":\"x\"},{\"id\":\"4044558\",\"prediction\":\"1\"},{\"id\":\"4044559\",\"prediction\":\"x\"},{\"id\":\"4044608\",\"prediction\":\"2\"},{\"id\":\"4044560\",\"prediction\":\"2\"}]', '2023-04-03 15:35:20'),
(12, 'Ditte', 'null', 0, '[{\"id\":\"4044557\",\"prediction\":\"1\"},{\"id\":\"4044565\",\"prediction\":\"1\"},{\"id\":\"4044571\",\"prediction\":\"1\"},{\"id\":\"4044558\",\"prediction\":\"x\"},{\"id\":\"4044559\",\"prediction\":\"x\"},{\"id\":\"4044608\",\"prediction\":\"x\"},{\"id\":\"4044560\",\"prediction\":\"2\"}]', '2023-04-03 15:35:20'),
(13, 'Ditte', 'null', 0, '[{\"id\":\"4044557\",\"prediction\":\"1\"},{\"id\":\"4044565\",\"prediction\":\"1\"},{\"id\":\"4044571\",\"prediction\":\"1\"},{\"id\":\"4044558\",\"prediction\":\"x\"},{\"id\":\"4044559\",\"prediction\":\"x\"},{\"id\":\"4044608\",\"prediction\":\"x\"},{\"id\":\"4044560\",\"prediction\":\"2\"}]', '2023-04-03 15:35:20'),
(14, 'asd', 'null', 0, '[{\"id\":\"4044557\",\"prediction\":\"1\"},{\"id\":\"4044565\",\"prediction\":\"1\"},{\"id\":\"4044571\",\"prediction\":\"1\"},{\"id\":\"4044558\",\"prediction\":\"1\"},{\"id\":\"4044559\",\"prediction\":\"1\"},{\"id\":\"4044608\",\"prediction\":\"1\"},{\"id\":\"4044560\",\"prediction\":\"x\"}]', '2023-04-03 15:35:20'),
(15, 'asd', 'null', 0, '[{\"id\":\"4044557\",\"prediction\":\"1\"},{\"id\":\"4044565\",\"prediction\":\"1\"},{\"id\":\"4044571\",\"prediction\":\"1\"},{\"id\":\"4044558\",\"prediction\":\"1\"},{\"id\":\"4044559\",\"prediction\":\"1\"},{\"id\":\"4044608\",\"prediction\":\"1\"},{\"id\":\"4044560\",\"prediction\":\"x\"}]', '2023-04-03 15:35:20'),
(16, 'asd', 'null', 0, '[{\"id\":\"4044557\",\"prediction\":\"1\"},{\"id\":\"4044565\",\"prediction\":\"1\"},{\"id\":\"4044571\",\"prediction\":\"1\"},{\"id\":\"4044558\",\"prediction\":\"1\"},{\"id\":\"4044559\",\"prediction\":\"1\"},{\"id\":\"4044608\",\"prediction\":\"1\"},{\"id\":\"4044560\",\"prediction\":\"x\"}]', '2023-04-03 15:35:20'),
(17, 'Cola', 'null', 0, '[{\"id\":\"4044557\",\"prediction\":\"2\"},{\"id\":\"4044565\",\"prediction\":\"2\"},{\"id\":\"4044560\",\"prediction\":\"x\"},{\"id\":\"4044608\",\"prediction\":\"x\"},{\"id\":\"4044559\",\"prediction\":\"x\"},{\"id\":\"4044558\",\"prediction\":\"1\"},{\"id\":\"4044571\",\"prediction\":\"1\"}]', '2023-04-03 15:35:20'),
(18, '888', 'null', 0, '[{\"id\":\"4044560\",\"prediction\":\"1\"},{\"id\":\"4044608\",\"prediction\":\"1\"},{\"id\":\"4044559\",\"prediction\":\"1\"},{\"id\":\"4044558\",\"prediction\":\"1\"},{\"id\":\"4044557\",\"prediction\":\"2\"},{\"id\":\"4044565\",\"prediction\":\"2\"},{\"id\":\"4044571\",\"prediction\":\"2\"}]', '2023-04-03 15:35:20'),
(19, 'Lol', 'null', 0, '[{\"id\":\"4044560\",\"prediction\":\"x\"},{\"id\":\"4044557\",\"prediction\":\"x\"},{\"id\":\"4044608\",\"prediction\":\"1\"},{\"id\":\"4044565\",\"prediction\":\"1\"},{\"id\":\"4044559\",\"prediction\":\"x\"},{\"id\":\"4044571\",\"prediction\":\"2\"},{\"id\":\"4044558\",\"prediction\":\"2\"}]', '2023-04-03 15:35:20');

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
  MODIFY `coupons_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
