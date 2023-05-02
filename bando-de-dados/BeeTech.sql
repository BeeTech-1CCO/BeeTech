CREATE DATABASE BeeTech;
USE BeeTech;
CREATE TABLE Empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR(45),
    cnpj CHAR(18),
    emailEmpresa VARCHAR(45),
    telefoneEmpresa VARCHAR(45)
	);

CREATE TABLE Representante (
	idRepresentante INT PRIMARY KEY AUTO_INCREMENT,
    nomeRepresentante VARCHAR(45),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
	);

CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(45),
    senha VARCHAR(45),
    fkEmpresa INT,
	FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
	);

CREATE TABLE Endereco (
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(45),
    numero INT,
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    cep CHAR(9),
    fkEmpresa INT,
	FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
	);

CREATE TABLE LocalSensor (
	idLocal INT PRIMARY KEY AUTO_INCREMENT,
    nomeLocal VARCHAR(45),
	fkEmpresa INT,
	FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
	);

CREATE TABLE Sensor (
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(45),
	fkEmpresa INT,
	FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
	);

CREATE TABLE Registro (
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME,
    temperatura INT,
    umidade INT,
	fkSensor INT,
	FOREIGN KEY (fkSensor) REFERENCES Sensor (idSensor)
	);