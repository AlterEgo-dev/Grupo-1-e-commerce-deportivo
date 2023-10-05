SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sportify
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schemas portify
-- -----------------------------------------------------
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sportify` DEFAULT CHARACTER SET utf8 ;
USE `sportify` ;

-- -----------------------------------------------------
-- Table `sportify`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportify`.`Users` (
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
-- Table `sportify`.`Categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportify`.`Categories` (
  `Id` INT NOT NULL,
  `Category` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportify`.`Genders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportify`.`Genders` (
  `id` INT NOT NULL,
  `Gender` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportify`.`Sizes` (
  `Id` INT NOT NULL,
  `Size` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sportify`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sportify`.`Products` (
  `Id` INT NOT NULL,
  `Name` VARCHAR(150) NOT NULL,
  `Descripcion` VARCHAR(1000) NULL,
  `Price` DECIMAL(20,2) NOT NULL,
  `ImagePrincipal` VARCHAR(150) NOT NULL,
  `Image1` VARCHAR(150) NULL,
  `Image2` VARCHAR(150) NULL,
  `Image3` VARCHAR(150) NULL,
  `OtherProperties` VARCHAR(150) NULL,
  `Genders_id` INT NOT NULL,
  `Categories_Id` INT NOT NULL,
  `Genders_id1` INT NOT NULL,
  `Sizes_Id1` INT NOT NULL,
  PRIMARY KEY (`Id`, `Genders_id`),
  INDEX `fk_Products_Categories1_idx` (`Categories_Id` ASC),
  INDEX `fk_Products_Genders2_idx` (`Genders_id1` ASC),
  INDEX `fk_Products_Sizes1_idx` (`Sizes_Id1` ASC),
  CONSTRAINT `fk_Products_Categories1`
    FOREIGN KEY (`Categories_Id`)
    REFERENCES `sportify`.`Categories` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Products_Genders2`
    FOREIGN KEY (`Genders_id1`)
    REFERENCES `sportify`.`Genders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Products_Sizes1`
    FOREIGN KEY (`Sizes_Id1`)
    REFERENCES `sportify`.`Sizes` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


--para crear la base de datos