-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 19, 2025 at 04:34 AM
-- Server version: 8.0.30
-- PHP Version: 8.5.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int NOT NULL,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` varchar(36) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('to_do','in_progress','done') NOT NULL DEFAULT 'to_do',
  `deadline` datetime DEFAULT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `user_id`, `title`, `description`, `status`, `deadline`, `created_by`, `created_at`) VALUES
('2ce4b663-8a41-40f3-b010-61292ef73c37', 'a908a103-c730-44b1-8dc3-a5dd573e1f02', 'Bismillah2', 'asdfsadfsdfdsf', 'done', '2025-12-31 00:00:00', 'a908a103-c730-44b1-8dc3-a5dd573e1f02', '2025-12-19 00:27:25.206977'),
('8d76f683-d50b-4c39-a5e4-ae12b423e1d8', 'a908a103-c730-44b1-8dc3-a5dd573e1f02', 'Test123456', 'Task hebat banger', 'in_progress', '2025-12-28 07:00:00', 'a908a103-c730-44b1-8dc3-a5dd573e1f02', '2025-12-18 10:49:45.487992'),
('bc3ab859-7d28-4b9a-8902-12abdf539f64', 'a908a103-c730-44b1-8dc3-a5dd573e1f02', 'Broadcast', 'asdfasdfsdfsadfasf', 'to_do', '2025-12-31 00:00:00', 'a908a103-c730-44b1-8dc3-a5dd573e1f02', '2025-12-19 00:34:25.218650');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(36) NOT NULL,
  `username` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
('96e3f9ee-15ed-43b1-829c-2cee6a27e0fe', 'mizzy-123', 'Muhammad Mizzy', 'muhammadmizzy09@gmail.com', '$2b$10$IjD/w8juw3mL39h.wA9.uexQl0K2mpbjD4rgreHKardBhvE5k9Hj.', '2025-12-18 10:28:24.482328', '2025-12-18 10:28:24.482328'),
('a908a103-c730-44b1-8dc3-a5dd573e1f02', 'mizzy12', 'Muhammad Mizzy', 'mizzy12342@gmail.com', '$2b$10$ugsWzTVnaJ7OwTveJtBQLO9sk6HwvFmWTfS/ai2BvX.Elpb3fgXxq', '2025-12-18 00:57:04.799903', '2025-12-18 00:57:04.799903');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `FK_6ea2c1c13f01b7a383ebbeaebb0` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `FK_6ea2c1c13f01b7a383ebbeaebb0` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
