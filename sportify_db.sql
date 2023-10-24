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
CREATE SCHEMA IF NOT EXISTS `sportify_db` DEFAULT CHARACTER SET utf8 ;
USE `sportify_db` ;
--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE IF NOT EXISTS `sportify_db`.`products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(150) NOT NULL,
  `Description` varchar(2000) NOT NULL,
  `Price` decimal(20,2) NOT NULL,
  `Image1` varchar(200) NOT NULL,
  `ImageDetail` varchar(200) NULL,
  `Care` varchar(1000) NULL,
  `Category` varchar(150) NOT NULL,
  `Gender` varchar(150) NOT NULL,
  `Size` varchar(300) NOT NULL,
  PRIMARY KEY (`id`))
 ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `sportify_db`.`users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(150) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Password` varchar(150) NOT NULL,
  `Avatar` varchar(150) DEFAULT NULL,
  `Role` varchar(45) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
   PRIMARY KEY (`id`))
 ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
