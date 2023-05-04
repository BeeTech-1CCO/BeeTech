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
    
INSERT INTO empresa VALUES (null,'AgroPiario','39.195.673/0001-80','agro.piario@gmail.com','1234-5678'),
						   (null,'Piario','71.607.220/0001-26','piario@gmail.com','1564-2278'),
                           (null,'BeeSmart','80.188.316/0001-98','BEE.SMART@gmail.com','1324-5566'),
                           (null,'Abelhas Brasil','50.688.122/0001-90','abelhas.brasil@gmail.com','1231-5658'),
                           (null,'BeeHoney','84.281.654/0001-20','honey.bee@gmail.com','1874-5476');
                           
INSERT INTO representante (nomeRepresentante, fkEmpresa) VALUES ("Pedro Augustino", 1),
("Jonas Silva", 1),
("Marisa de Almeida", 2),
("Roberto Silva", 3),
("Carlos Alberto de Santos", 4),
("Kassandra Gimenez", 5);

INSERT INTO Usuario (login, senha, fkEmpresa)VALUES
('Pedro Augustino', '123456', 1),
("Jonas Silva", '123456',1),
("Marisa de Almeida", '123456', 2),
("Roberto Silva", '123456',3),
("Carlos Alberto de Santos", '123456', 4),
("Kassandra Gimenez", '123456',5);

INSERT INTO Endereco VALUES
	(NULL, 'João Millam', '45', 'Rio Pequeno', 'São Paulo', '08928-833', 1),
	(NULL, 'América', '59', 'São João', 'Paraná', '08928-834', 2),
	(NULL, 'Pedro Alvares', '67', 'João pequeno', 'Diadema', '08928-835', 3),
	(NULL, 'Diogo de Azevedo', '234', 'Rio Pequeno', 'Paraná', '08928-836', 4),
	(NULL, 'João da Silva', '143', 'Flamengo', 'Rio de Janeiro', '08928-837', 5);
    
INSERT INTO LocalSensor VALUES(NULL, 'Fazenda da Juta',1),
						      (NULL, 'Vale do sol', 2),
                              (NULL, 'Prrodução 6', 1),
                              (NULL, 'Fazenda arco-irpis', 3),
                              (NULL, 'Doce Mel', 4),
                              (NULL, 'Happy bee', 5);
                              
INSERT into sensor values (null,'dht11',1),
						  (null,'dht11',2),
                          (null,'dht11',3),
                          (null,'dht11',4),
                          (null,'dht11',5);
                          
INSERT INTO Registro VALUES
	(NULL, '2023-05-02', 30, 54, 1),
	(NULL, '2023-02-15', 28, 78, 2),
	(NULL, '2023-03-22', 33, 46, 3),
	(NULL, '2023-11-12', 34, 65, 4),
	(NULL, '2023-04-17', 25, 60, 5);