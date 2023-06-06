CREATE DATABASE BeeTech;
USE BeeTech;

-- Criação das tabelas
    
CREATE TABLE Empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
	nomeEmpresa VARCHAR(45),
    emailEmpresa VARCHAR(45),
    telefoneEmpresa CHAR(11),
    cnpj CHAR(18),
    nameRepresentante VARCHAR(50),
	cidade VARCHAR(45),
    cep CHAR(9),
	bairro VARCHAR(45),
    rua VARCHAR(45),
	numero INT,
    senha VARCHAR(45)
	);

CREATE TABLE LocalSensor (
	idLocal INT,
    nomeLocal VARCHAR(45),
	fkEmpresa INT,
	FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa),
    PRIMARY KEY (idLocal, fkEmpresa)
	);

CREATE TABLE Sensor (
	idSensor INT,
    tipo VARCHAR(45),
	fkEmpresa INT,
    fkLocal INT,
	FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa),
    FOREIGN KEY (fkLocal) REFERENCES LocalSensor(idLocal),
    PRIMARY KEY (idSensor, fkEmpresa, fkLocal)
	);

CREATE TABLE Registro (
	idRegistro INT,
    dataHora DATETIME,
    temperatura INT,
    umidade INT,
	fkSensor INT,
    fkLocal INT,
    fkEmpresa INT,
	FOREIGN KEY (fkSensor) REFERENCES Sensor (idSensor),
    FOREIGN KEY (fkLocal) REFERENCES LocalSensor(idLocal),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    PRIMARY KEY (idRegistro, dataHora, fkSensor, fkLocal, fkEmpresa)
	);
  
-- Inserindo os primeiros dados manualmente

INSERT INTO Empresa (idEmpresa, nomeEmpresa, emailEmpresa, telefoneEmpresa, cnpj, nameRepresentante, cidade, cep, bairro, rua, numero, senha) VALUES (NULL,'AgroPiario', 'AgroPiario@email.com', '1234-5678', '39.195.673/0001-80', 'Jonas Silva', 'São Paulo', '08928-833', 'Rio Pequeno', 'João Millam', 45, '123456'),
						   (NULL,'Piario', 'Piario@email.com', '1564-2278', '71.607.220/0001-26', 'Pedro Augustino', 'São João', '08928-834', 'Panama', 'América', 59, '183457'),
                           (NULL,'BeeSmart', 'BEE.SMART@gmail.com', '1324-5566', '80.188.316/0001-98', 'Marisa de Almeida', 'Diadema', '08928-835', 'João pequeno', 'Pedro Alvares', 67, '183457'),
                           (NULL,'Abelhas Brasil', 'abelhas.brasil@gmail.com', '1231-5658', '50.688.122/0001-90', 'Roberto Silva', 'Rio Pequeno', '08928-836', 'vale doce', 'Augusto Cury', 80, '18345735#$'),
                           (NULL, 'BeeHoney', 'Honey.bee@gmail.com', '1874-5476', '84.281.654/0001-20', 'Kassandra Gimenez', 'Lapa', '18948-895', 'Carioca', 'Morro do Samba', 100, '182145');
    
SELECT * FROM Empresa;

    
INSERT INTO LocalSensor VALUES(10, 'Fazenda da Juta', 1),
						      (11, 'Vale do sol', 2),
                              (12, 'Prrodução 6', 1),
                              (13, 'Fazenda arco-irpis', 3),
                              (14, 'Doce Mel', 4),
                              (15, 'Happy bee', 5);
                              
SELECT * FROM LocalSensor;

                              
INSERT INTO Sensor(idSensor, tipo, fkEmpresa, fkLocal) values (20,'dht11',1, 13),
															  (21,'dht11', 2, 10),
															  (22,'dht11',3, 12),
															  (23,'dht11',4, 14),
															  (24,'dht11',5, 15);
SELECT * FROM Sensor;

                          
INSERT INTO Registro(idRegistro, dataHora, temperatura, umidade, fkSensor, fkLocal, fkEmpresa) VALUES(30, '2023-05-02', 30, 54, 20, 10, 1),
																									 (31, '2023-02-15', 28, 78, 22, 13, 2),
																									 (32, '2023-03-22', 33, 46, 23, 11, 5),
	                                                                                                 (33, '2023-11-12', 34, 65, 24, 15, 2),
	                                                                                                 (34, '2023-04-17', 25, 60, 21, 12, 3);
    
SELECT * FROM Registro;