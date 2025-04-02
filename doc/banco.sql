-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema tccteste1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tccteste1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tccteste1` DEFAULT CHARACTER SET utf8 ;
USE `tccteste1` ;

-- -----------------------------------------------------
-- Table `tccteste1`.`cargo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tccteste1`.`cargo` (
  `idCargo` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nomeCargo` VARCHAR(64) NULL DEFAULT NULL,
  PRIMARY KEY (`idCargo`),
  UNIQUE INDEX `idCargo_UNIQUE` (`idCargo` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tccteste1`.`funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tccteste1`.`funcionario` (
  `IdFuncionario` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Cargo_idCargo` INT(10) UNSIGNED NOT NULL,
  `nomeFuncionario` VARCHAR(128) NULL DEFAULT NULL,
  `emailFuncionario` VARCHAR(64) NULL DEFAULT NULL,
  `senhaFuncionario` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`IdFuncionario`),
  UNIQUE INDEX `IdFuncionario_UNIQUE` (`IdFuncionario` ASC),
  INDEX `fk_Funcionario_Cargo_idx` (`Cargo_idCargo` ASC),
  CONSTRAINT `fk_Funcionario_Cargo`
    FOREIGN KEY (`Cargo_idCargo`)
    REFERENCES `tccteste1`.`cargo` (`idCargo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tccteste1`.`visitante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tccteste1`.`visitante` (
  `idVisitante` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `dataVisita` DATE NOT NULL,
  `nome` VARCHAR(128) NOT NULL,
  `rg` VARCHAR(20) NOT NULL,
  `empresa` VARCHAR(128) NULL DEFAULT NULL,
  `origem` VARCHAR(128) NULL DEFAULT NULL,
  `horarioEntrada` TIME NOT NULL,
  `horarioSaida` TIME NULL DEFAULT NULL,
  PRIMARY KEY (`idVisitante`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
