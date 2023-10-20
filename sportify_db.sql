-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2023 a las 16:56:50
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sportify_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Description` varchar(45) NOT NULL,
  `Price` decimal(20,2) NOT NULL,
  `Image1` varchar(200) NOT NULL,
  `ImageDetail` varchar(200) DEFAULT NULL,
  `Care` varchar(1000) DEFAULT NULL,
  `Category` varchar(150) NOT NULL,
  `Gender` varchar(150) NOT NULL,
  `Size` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `Name`, `Description`, `Price`, `Image1`, `ImageDetail`, `Care`, `Category`, `Gender`, `Size`) VALUES
(1, 'Prueba', 'sdfsdf', 23423.00, '', '', 'sdfsdfsd', '1', '1', 'sa'),
(2, 'Prueba2', 'dsfsf', 2423.00, '', '', 'sdfsdfsdfsdf', 'Calzado', '1', 'talle-35'),
(3, 'Prueba', 'dfdsfsd', 23423.00, '', '', 'sdfsdfsdfs', 'Calzado', 'Hombre', 'talle-35, talle.36, talle-37'),
(4, 'fgdfgdfgd', 'gffdgdfgdfg', 543.00, '/img/productos/Z1-1697810919251-592039152.jpg', 'a', 'dfgdfgdf', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(5, 'Prueba45', 'dfgdfg', 43534.00, 'sin-foto.png', 'sin-foto.png', 'dfgdfgdf', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(6, 'Prueba5', 'sdfsd', 23423.00, 'sin-foto.png', 'sin-foto.png', 'fsdfdsfs', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(7, 'Prueba5', 'sdfsd', 23423.00, 'sin-foto.png', 'sin-foto.png', 'fsdfdsfs', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(8, 'prueba7', 'dsfds', 3423.00, 'sin-foto.png', 'sin-foto.png', 'fsdfsd', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(9, 'prueba7', 'dsfds', 3423.00, 'sin-foto.png', '', 'fsdfsd', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(10, 'prueba7', 'dsfds', 3423.00, 'sin-foto.png', '', 'fsdfsd', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(11, 'prueba7', 'dsfds', 3423.00, 'sin-foto.png', 'sin-foto.png', 'fsdfsd', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(12, 'prueba7', 'dsfds', 3423.00, 'sin-foto.png', 'sin-foto.png', 'fsdfsd', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(13, 'PARUEBA', 'dsfsdf', 2342.00, '/img/productos/Z1-1697811716312-282500145.jpg', '/img/productos/Z1-1697811716312-282500145.jpg', 'dfsf', 'Calzado', 'Mujer', 'talle-s, talle-m'),
(14, 'Prueba', 'sdfsdfsdf', 23423.00, 'sin-foto.png', 'sin-foto.png', 'sdfsdfs', 'Calzado', 'Mujer', 'talle-35, talle-36, talle-37'),
(15, 'NuevaPrueba', 'dsfsd', 32423.00, 'sin-foto.png', '/img/productos/Z1-1697812225593-397513713.jpg, /img/productos/Z1-1697812225593-452644268.jpg, /img/productos/Z1-1697812225595-655641281.jpg', 'sdfsdf', 'Calzado', 'Hombre', 'talle-35, talle-36'),
(16, 'asdsa', 'sdfsfsd', 324.00, '/img/productos/undefined', '', 'fsdfsd', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(17, 'Prueba45', 'dfgdfg', 43534.00, 'sin-foto.png', '/img/productos/Z1-1697812409637-99661923.jpg', 'dfgdfgdf', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(18, 'dsfdsf', 'dfsdfs', 45.00, 'sin-foto.png', '', 'sdfdsf', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(19, 'dsfdsf', 'dfsdfs', 45.00, 'sin-foto.png', 'sin-foto.png', 'sdfdsf', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(20, 'dfsdfsd', 'sdfsd', 23423.00, '/img/productos/Z1-1697813081188-986065006.jpg', 'sin-foto.png', 'fsdfsdfs', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(21, 'dfsdfsd', 'sdfsd', 23423.00, '/img/productos/Z1-1697813193685-448063157.jpg', 'sin-foto.png', 'fsdfsdfs', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(22, 'sadasdas', 'dsfdsf', 32423.00, 'sin-foto.png', '/img/productos/Z1-1697813258464-545780483.jpg', 'sdfsd', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(23, 'asdasdas', 'sdfsd', 23423.00, 'sin-foto.png', '/img/productos/Z1-1697813276470-889706792.jpg, /img/productos/Z1-1697813276471-835348694.jpg, /img/productos/Z1-1697813276471-395635286.jpg', 'fsdfsdf', 'Calzado', 'Hombre', 'talle-35, talle-36'),
(24, 'asdasdas', 'sdfsd', 23423.00, 'sin-foto.png', '/img/productos/Z1-1697813433888-819612746.jpg, /img/productos/Z1-1697813433889-576925217.jpg, /img/productos/Z1-1697813433890-153615879.jpg', 'fsdfsdf', 'Calzado', 'Hombre', 'talle-35, talle-36'),
(25, 'ADASD', '32ewdfsafd', 234.00, '/img/productos/undefined', '/img/productos/Z1-1697813609323-977825459.jpg, /img/productos/Z1-1697813609323-535344906.jpg, /img/productos/Z1-1697813609324-520579691.jpg', 'sfdsfsd', 'Indumentaria', 'Mujer', 'talle-s, talle-m'),
(26, 'ADASD', '32ewdfsafd', 234.00, '/img/productos/Z1-1697813625590-315366125.jpg', '/img/productos/Z1-1697813625591-234138269.jpg, /img/productos/Z1-1697813625591-859691586.jpg, /img/productos/Z1-1697813625592-183279250.jpg', 'sfdsfsd', 'Indumentaria', 'Mujer', 'talle-s, talle-m');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `UserName` varchar(150) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Password` varchar(150) NOT NULL,
  `Avatar` varchar(150) DEFAULT NULL,
  `Role` varchar(45) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `UserName`, `Email`, `Password`, `Avatar`, `Role`, `CreatedAt`) VALUES
(1, ' admin', 'admin@admin.com', '$2a$10$0g1ziZKL6KgDI2fV/mUYN.c8HWAN5Pl1BmTsyTQbJn8j3vBSX0n4K', '../../img/img-perfil/sin-perfil.png', 'Admin', '2023-10-20 13:35:21');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
