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
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportify_db`.`Categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportify_db`.`Categories` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Category` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportify_db`.`Genders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportify_db`.`Genders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Gender` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportify_db`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportify_db`.`Products` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(150) NOT NULL,
  `Description` VARCHAR(1000) NOT NULL,
  `Price` DECIMAL(20,2) NOT NULL,
  `ImagePrincipal` VARCHAR(150) NOT NULL,
  `Image1` VARCHAR(150) NULL,
  `Image2` VARCHAR(150) NULL,
  `Image3` VARCHAR(150) NULL,
  `OtherProperties` VARCHAR(1000) NULL,
  `Categories_Id` INT NOT NULL,
  `Genders_id1` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Products_Categories1_idx` (`Categories_Id` ASC),
  INDEX `fk_Products_Genders2_idx` (`Genders_id1` ASC),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC),
  CONSTRAINT `fk_Products_Categories1`
    FOREIGN KEY (`Categories_Id`)
    REFERENCES `sportify_db`.`Categories` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Products_Genders2`
    FOREIGN KEY (`Genders_id1`)
    REFERENCES `sportify_db`.`Genders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportify_db`.`Sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportify_db`.`Sizes` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Size` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportify_db`.`Sizes_has_Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportify_db`.`Sizes_has_Products` (
  `Sizes_Id` INT NOT NULL,
  `Products_Id` INT NOT NULL,
  PRIMARY KEY (`Sizes_Id`, `Products_Id`),
  INDEX `fk_Sizes_has_Products_Products1_idx` (`Products_Id` ASC),
  INDEX `fk_Sizes_has_Products_Sizes1_idx` (`Sizes_Id` ASC),
  CONSTRAINT `fk_Sizes_has_Products_Sizes1`
    FOREIGN KEY (`Sizes_Id`)
    REFERENCES `sportify_db`.`Sizes` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Sizes_has_Products_Products1`
    FOREIGN KEY (`Products_Id`)
    REFERENCES `sportify_db`.`Products` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
