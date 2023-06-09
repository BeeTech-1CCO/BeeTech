var fk = 1;
var aumentar = 0;

const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3000;
const HABILITAR_OPERACAO_INSERIR = true;

const serial = async (
    valoresDht11Umidade,
    valoresDht11Temperatura,
    // valoresLuminosidade,
    // valoresLm35Temperatura,
    // valoresChave
) => {
    const poolBancoDados = mysql.createPool(
        {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '0108Oliver',
            database: 'BeeTech'
        }
    ).promise();

    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        const valores = data.split(';');
        const dht11Umidade = parseFloat(valores[0]);
        const dht11Temperatura = parseFloat(valores[1]);
        // const luminosidade = parseFloat(valores[2]);
        // const lm35Temperatura = parseFloat(valores[3]);
        // const chave = parseInt(valores[4]);

        valoresDht11Umidade.push(dht11Umidade);
        valoresDht11Temperatura.push(dht11Temperatura);
        // valoresLuminosidade.push(luminosidade);
        // valoresLm35Temperatura.push(lm35Temperatura);
        // valoresChave.push(chave);

        var id = null;
        var data = new Date();

        if (HABILITAR_OPERACAO_INSERIR && fk == 1) {
            await poolBancoDados.execute(
                'INSERT INTO Registro (idRegistro,  dataHora, temperatura, umidade, fkSensor) VALUES (?, ?, ?, ?, ?)',
                [id, data, dht11Temperatura + aumentar, dht11Umidade + aumentar, fk]
            );

        }else{
            if (HABILITAR_OPERACAO_INSERIR) {
                await poolBancoDados.execute(
                    'INSERT INTO Registro (idRegistro,  dataHora, temperatura, umidade, fkSensor) VALUES (?, ?, ?, ?, ?)',
                    [id, data, dht11Temperatura, dht11Umidade, fk]
                );
            }
        }

        if (fk == 1) {


            if(aumentar <= 40){

                aumentar += 10;

            }else if(aumentar > 40){

                aumentar -= 95;

            }
            

        }

        if (fk == 4) {

            fk = 1;

        } else {

            fk = fk + 1;

        }

    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

const servidor = (
    valoresDht11Umidade,
    valoresDht11Temperatura,
    // valoresLuminosidade,
    // valoresLm35Temperatura,
    // valoresChave
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });
    app.get('/registro/umidade', (_, response) => {
        console.log(valoresDht11Umidade);
        return response.json(valoresDht11Umidade);
    });
    app.get('/registro/temperatura', (_, response) => {
        return response.json(valoresDht11Temperatura);
    });
    app.get('/registro/fkSensor', (_, response) => {
        return response.json(valoresFK);
    });

    // app.get('/sensores/luminosidade', (_, response) => {
    //     return response.json(valoresLuminosidade);
    // });
    // app.get('/sensores/lm35/temperatura', (_, response) => {
    //     return response.json(valoresLm35Temperatura);
    // });
    // app.get('/sensores/chave', (_, response) => {
    //     return response.json(valoresChave);
    // });
}

(async () => {
    const valoresDht11Umidade = [];
    const valoresDht11Temperatura = [];
    const valoresFK = [];
    // const valoresLuminosidade = [];
    // const valoresLm35Temperatura = [];
    // const valoresChave = [];
    await serial(
        valoresDht11Umidade,
        valoresDht11Temperatura,
        valoresFK
        // valoresLuminosidade,
        // valoresLm35Temperatura,
        // valoresChave
    );
    servidor(
        valoresDht11Umidade,
        valoresDht11Temperatura,
        valoresFK
        // valoresLuminosidade,
        // valoresLm35Temperatura,
        // valoresChave
    );
})();
