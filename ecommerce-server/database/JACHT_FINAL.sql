-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2022 at 12:24 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jacht`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `photo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `name`, `email`, `photo`) VALUES
(1, 'admin1', 'f14b8817153ec3587ac15a740c28a70a12f23dc89229f7fbf17ea9df33f3a7c8', 'Fadi', 'fadi@gmail.com', NULL),
(2, 'admin2', '34edea56f39471f0651e9ef62d1e2985c74144a66170ee3b35ae4296bafaf254', 'Larry', 'larry@admin.com', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `percentage` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `discounts`
--

INSERT INTO `discounts` (`id`, `seller_id`, `percentage`, `code`) VALUES
(1, 1, '10', 'Y120HE'),
(2, 1, '25', '0OKQSA'),
(3, 2, '10', 'MEYL6J'),
(4, 3, '20', '0R2Q6I'),
(5, 3, '50', '6CENJ5');

-- --------------------------------------------------------

--
-- Table structure for table `favorited_products`
--

CREATE TABLE `favorited_products` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favorited_products`
--

INSERT INTO `favorited_products` (`user_id`, `product_id`) VALUES
(1, 6),
(1, 1),
(4, 12),
(2, 15),
(2, 1),
(2, 10),
(2, 2),
(2, 11);

-- --------------------------------------------------------

--
-- Table structure for table `following_stores`
--

CREATE TABLE `following_stores` (
  `user_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `product_id`, `image`) VALUES
(1, 1, 'images/product1.png'),
(2, 2, 'images/product2.png'),
(6, 3, 'images/product3.png'),
(7, 4, 'images/product4.png'),
(8, 5, 'images/product5.png'),
(9, 6, 'images/product6.png'),
(10, 7, 'images/product7.png'),
(11, 8, 'images/product8.png'),
(12, 9, 'images/product9.png'),
(13, 10, 'images/product10.png'),
(14, 11, 'images/product11.png'),
(15, 12, 'images/product12.png'),
(16, 13, 'images/product13.png'),
(17, 14, 'images/product14.png'),
(18, 15, 'images/product15.png'),
(19, 16, 'images/product16.png'),
(20, 17, 'images/product17.png');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `message_user` varchar(255) DEFAULT NULL,
  `message_seller` varchar(255) DEFAULT NULL,
  `time_sent` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `time` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `quantity` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `product_id`, `seller_id`, `time`, `price`, `quantity`) VALUES
(1, 1, 1, 2, '19 Sep 2022 @ 00:14', '1200', '1'),
(2, 1, 3, 1, '20 Sep 2022 @ 00:16', '54', '2'),
(3, 1, 5, 1, '20 Sep 2022 @ 00:19', '40', '1'),
(4, 1, 6, 1, '23 Sep 2022 @ 00:19', '80', '2'),
(5, 2, 6, 1, '25 Sep 2022 @ 00:19', '80', '2'),
(6, 2, 1, 2, '24 Sep 2022 @ 00:19', '1200', '1'),
(7, 2, 8, 1, '20 Sep 2022 @ 00:19', '85', '1'),
(8, 2, 10, 3, '21 Sep 2022 @ 00:19', '220', '2'),
(9, 3, 10, 3, '25 Sep 2022 @ 00:20', '220', '2'),
(10, 3, 2, 2, '25 Sep 2022 @ 00:20', '400', '1'),
(11, 3, 3, 1, '24 Sep 2022 @ 00:20', '90', '3'),
(12, 3, 8, 1, '25 Sep 2022 @ 00:20', '85', '1'),
(13, 3, 13, 3, '23 Sep 2022 @ 00:20', '550', '5'),
(14, 3, 14, 3, '23 Sep 2022 @ 00:21', '150', '1'),
(15, 4, 2, 2, '25 Sep 2022 @ 00:21', '400', '1'),
(16, 4, 8, 1, '22 Sep 2022 @ 00:21', '85', '1'),
(17, 4, 13, 3, '19 Sep 2022 @ 00:21', '440', '4'),
(18, 4, 14, 3, '23 Sep 2022 @ 00:21', '300', '2'),
(19, 5, 2, 2, '22 Sep 2022 @ 00:21', '400', '1');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `times_favorited` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `visited` int(11) NOT NULL,
  `times_purchased` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `seller_id`, `name`, `category`, `description`, `price`, `times_favorited`, `discount`, `visited`, `times_purchased`) VALUES
(1, 2, 'Nvidia GPU RTX 3080 Ti', 'electronics', 'The GeForce RTX™ 3080 Ti and RTX 3080 graphics cards deliver the ultra performance that gamers crave, powered by Ampere—NVIDIA\'s 2nd gen RTX architecture.', 1200, 0, 0, 0, 2),
(2, 2, 'Nvidia GPU GTX 970', 'electronics', 'GTX 970 4GB SC GAMING ACX 2.0 (04G-P4-2974-KR): Graphics Cards', 400, 0, 0, 0, 3),
(3, 1, 'MINI FLARE TROUSERS', 'clothes', 'High-waist trousers with front welt pockets. Flared hems. Metal hook and zip fastening at the front.', 30, 0, 0, 0, 5),
(4, 1, 'MINI FLARE TROUSERS White', 'clothes', 'High-waist trousers with front welt pockets. Flared hems. Metal hook and zip fastening at the front.', 30, 0, 0, 0, 0),
(5, 1, 'MASCULINE WIDE-LEG TROUSERS White', 'clothes', 'High-waist trousers with front darts and a wide-leg design. Front pockets and false rear flap pocket. Front zip fly, inside button and metal hook fastening.', 40, 0, 0, 0, 1),
(6, 1, 'MASCULINE WIDE-LEG TROUSERS Green', 'clothes', 'High-waist trousers with front darts and a wide-leg design. Front pockets and false rear flap pocket. Front zip fly, inside button and metal hook fastening.', 40, 0, 0, 0, 4),
(7, 1, 'PACKAWAY PUFFER COAT', 'clothes', 'Water-repellent high neck coat. Featuring a removable hood with a zip and adjustable drawstrings and stoppers. Long sleeves with elasticated cuffs. Front thermo-sealed zip pockets. Adjustable hem. Thermo-sealed zip-up front.', 110, 0, 0, 0, 0),
(8, 1, 'WATER-REPELLENT PUFFER GILET', 'clothes', 'Cropped high neck gilet. Front zip pockets. Adjustable hem with elastic drawstrings. Front zip and snap-button fastening.', 85, 0, 0, 0, 3),
(9, 1, 'OVERSIZED BLAZER WITH POCKETS Brown', 'clothes', 'Loose-fitting blazer made of a viscose blend. Lapel collar and long sleeves. Front flap pocket and false chest welt pocket. Matching lining. Fastens on the front with a button.', 180, 0, 0, 0, 0),
(10, 3, 'SunPower A-Series SPR-A415-G-AC', 'electronics', 'Rated Power:  415W\nOutput Warranty Term:  25 years , Linear\nMaterials Warranty Term:  25 years', 110, 0, 0, 0, 4),
(11, 3, 'SunPower M series SPR-M425-H-AC', 'electronics', 'Rated Power:  425W\nOutput Warranty Term:  25 years , Linear\nMaterials Warranty Term:  25 years', 140, 0, 0, 0, 0),
(12, 3, 'SunPower A-Series SPR-A390-G-AC', 'electronics', 'Rated Power:  390W\nOutput Warranty Term:  25 years , Linear\nMaterials Warranty Term:  25 years', 130, 0, 0, 0, 0),
(13, 3, 'SunPower E-Series SPR-E20-327', 'electronics', 'Rated Power:  327W\nOutput Warranty Term:  25 years , Linear\nMaterials Warranty Term:  25 years', 110, 0, 0, 0, 9),
(14, 3, 'SunPower M series SPR-M420-H-AC', 'electronics', 'Rated Power:  420W\nOutput Warranty Term:  25 years , Linear\nMaterials Warranty Term:  25 years', 150, 0, 0, 0, 3),
(15, 3, 'SunPower X-Series Residential AC SPR-X22-360-', 'electronics', 'Rated Power:  360W\nOutput Warranty Term:  25 years , Linear\nMaterials Warranty Term:  25 years', 185, 0, 0, 0, 0),
(16, 3, 'SunPower M Series SPR-M-415-BLK-H-C', 'electronics', 'Rated Power:  415W\nOutput Warranty Term:  25 years , Linear\nMaterials Warranty Term:  25 years', 170, 0, 0, 0, 0),
(17, 3, 'SunPower A series A400-BLK', 'electronics', 'Rated Power:  400W\nOutput Warranty Term:  25 years , Linear\nMaterials Warranty Term:  25 years', 175, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date_joined` varchar(45) NOT NULL,
  `money` int(11) NOT NULL,
  `photo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`id`, `name`, `username`, `password`, `description`, `date_joined`, `money`, `photo`) VALUES
(1, 'Zara', 'zara_clothes', 'ca749856c03839f5275042ef54bd7c0376ae3d87661ff7ae6f986025d063dc41', 'Zara is one of the biggest international fashion companies, and it belongs to Inditex, one of the world\'s largest distribution groups.', '24 Sep 2022 @ 22:32', 599, NULL),
(2, 'NZXT', 'nzxt_gpus', 'a49f4610e44d0235d1096a3d9c95660a5c1f523e9945011d4e68e57e18939e87', 'NZXT is an American computer hardware manufacturer based in Los Angeles, California.', '24 Sep 2022 @ 22:33', 3600, 'images/seller2.png'),
(3, 'SunPower', 'sun_power', 'ba739add3f7c79837f246a2c2ffeac49c44604ba0c922ae544368c63edb3057b', 'SunPower is an American provider of photovoltaic solar energy generation systems and battery energy storage products, primarily for residential customers.', '24 Sep 2022 @ 22:34', 1880, 'images/seller3.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(45) NOT NULL,
  `date_joined` varchar(45) NOT NULL,
  `is_banned` int(11) NOT NULL,
  `money` int(11) NOT NULL,
  `amount_spent` int(11) NOT NULL,
  `photo` varchar(45) DEFAULT NULL,
  `voucher` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `password`, `email`, `date_joined`, `is_banned`, `money`, `amount_spent`, `photo`, `voucher`) VALUES
(1, 'charbel_daoud', 'Charbel', 'c87e8aa0cde2236159f877e13464a47f9274dca891a3d81e6e8281aef238ff2d', 'charbel@sefactory.io', '24 Sep 2022 @ 22:19', 0, 3426, 1374, 'images/client1.png', NULL),
(2, 'hassan_khalil', 'Hassan', 'ac6d5dc0c6404d6614717be5eb743b5c88a3dd8a1f235c8498617c0c0eb36058', 'hassan@sefactory.io', '24 Sep 2022 @ 22:19', 0, 800, 1585, NULL, NULL),
(3, 'charbel_maroun', 'Charbel M', '15316ed0e031358f69842400b2a83b43dd464622013ecc738d80ed24baecde2e', 'charbel.m@sefactory.io', '24 Sep 2022 @ 22:21', 0, 20, 1495, NULL, NULL),
(4, 'drakula_king', 'Mohammad', 'a5e277521e4d35126b9e350837f2b9764c6369a8c8f0b4749ed63998832fa5ba', 'mohd@sefactory.io', '24 Sep 2022 @ 22:21', 0, 0, 1225, NULL, NULL),
(5, 'tarek_123', 'Tarek', '3128247b7277845c5af8bbbd0d8519946668e9f443664fe18947a19065a38fa8', 'tarek@sefactory.io', '24 Sep 2022 @ 22:22', 1, 35, 400, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `code` varchar(45) NOT NULL,
  `qrcode` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`user_id`, `product_id`) VALUES
(1, 1),
(3, 5),
(3, 6),
(2, 1),
(2, 15),
(5, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_discounts_sellers1` (`seller_id`);

--
-- Indexes for table `favorited_products`
--
ALTER TABLE `favorited_products`
  ADD KEY `fk_users_has_products_users2` (`user_id`),
  ADD KEY `fk_users_has_products_products2` (`product_id`);

--
-- Indexes for table `following_stores`
--
ALTER TABLE `following_stores`
  ADD KEY `fk_users_has_sellers_users1` (`user_id`),
  ADD KEY `fk_users_has_sellers_sellers1` (`seller_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_images_products1` (`product_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_messages_users1` (`user_id`),
  ADD KEY `fk_messages_sellers1` (`seller_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_users1` (`user_id`),
  ADD KEY `fk_orders_products1` (`product_id`),
  ADD KEY `fk_orders_sellers1` (`seller_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_sellers1` (`seller_id`);

--
-- Indexes for table `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vouchers_users1` (`user_id`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD KEY `fk_users_has_products1_users1` (`user_id`),
  ADD KEY `fk_users_has_products1_products1` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `discounts`
--
ALTER TABLE `discounts`
  ADD CONSTRAINT `fk_discounts_sellers1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `favorited_products`
--
ALTER TABLE `favorited_products`
  ADD CONSTRAINT `fk_users_has_products_products2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_users_has_products_users2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `following_stores`
--
ALTER TABLE `following_stores`
  ADD CONSTRAINT `fk_users_has_sellers_sellers1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_users_has_sellers_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fk_images_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_messages_sellers1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_messages_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_orders_sellers1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_orders_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_sellers1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD CONSTRAINT `fk_vouchers_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `fk_users_has_products1_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_users_has_products1_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
