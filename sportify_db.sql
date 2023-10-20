-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sportify_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sportify_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sportify_db` DEFAULT CHARACTER SET utf8 ;
USE `sportify_db` ;

-- -----------------------------------------------------
-- Table `sportify_db`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportify_db`.`Products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(150) NOT NULL,
  `Description` VARCHAR(45) NOT NULL,
  `Price` DECIMAL(20,2) NOT NULL,
  `Image1` VARCHAR(150) NULL,
  `Image2` VARCHAR(150) NULL,
  `image3` VARCHAR(150) NULL,
  `Image4` VARCHAR(150) NULL,
  `Care` VARCHAR(1000) NULL,
  `Category` VARCHAR(150) NOT NULL,
  `Gender` VARCHAR(150) NOT NULL,
  `Size` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportify_db`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportify_db`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `UserName` VARCHAR(150) NOT NULL,
  `Email` VARCHAR(150) NOT NULL,
  `Password` VARCHAR(150) NOT NULL,
  `Avatar` VARCHAR(150) NULL,
  `Role` VARCHAR(45) NOT NULL,
  `CreatedAt` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
